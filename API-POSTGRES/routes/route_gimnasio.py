from fastapi import APIRouter
from fastapi import Response,Query
import config.db as db
from fastapi import HTTPException

# Importa los esquemas Pydantic que creaste anteriormente
from schemas.schema_gimnasio import (Attendance,
Details, Donations, Exercise, Invoice, Manage,
Member, Membership, Owner, Place, Product, Reservation,
Routine)

# Crea un enrutador para las rutas
route_gimnasio = APIRouter()


@route_gimnasio.get('/member-info/{mem_id}')
def get_attendance_by_member_id(mem_id):
    try:
        # Convertir mem_id a entero
        mem_id = int(mem_id)
        cur = db.connection.cursor()

        # Realizar la consulta utilizando el cursor
        cur.execute('''
            SELECT
                M.MEM_ID,
                M.MEM_NAME,
                M.MEM_LASTNAME,
                M.MEM_CODE,
                M.MEM_PHONE,
                M.MEM_EMAIL,
                M.MEM_LOCATION,
                M.MEM_PASSWORD,
                R.RES_DATE AS LAST_RESERVATION_DATE,
                R.RES_STATE AS RESERVATION_STATE,
                R.RES_HOUR AS RESERVATION_HOUR,
                MS.MBS_ID,
                MS.MBS_STATE AS MEMBERSHIP_STATE,
                MS.MBS_START_DATE,
                MS.MBS_DUE_DATE,
                P.PRO_NAME AS MEMBERSHIP_NAME
            FROM
                MEMBER M
            LEFT JOIN (
                SELECT
                    MEM_ID,
                    RES_DATE,
                    RES_STATE,
                    RES_HOUR
                FROM (
                    SELECT
                        MEM_ID,
                        RES_DATE,
                        RES_STATE,
                        RES_HOUR,
                        ROW_NUMBER() OVER (PARTITION BY MEM_ID ORDER BY RES_DATE DESC) AS rn
                    FROM
                        RESERVATION
                ) ranked
                WHERE
                    rn = 1
            ) R ON M.MEM_ID = R.MEM_ID
            LEFT JOIN MEMBERSHIP MS ON R.MEM_ID = MS.MEM_ID AND R.RES_DATE BETWEEN MS.MBS_START_DATE AND MS.MBS_DUE_DATE
            LEFT JOIN PRODUCT P ON MS.PRO_ID = P.PRO_ID
            WHERE
                M.MEM_ID = %(mem_id)s
        ''', {"mem_id": mem_id})

        result = cur.fetchall()

        if not result:
            return ({"message": f"No data found for member with MEM_ID={mem_id}"}), 404

        # Convertir los resultados en una lista de diccionarios
        columns = [desc[0] for desc in cur.description]
        result_list = [dict(zip(columns, row)) for row in result]
        result_info = result_list[0]

        return result_info
    except ValueError:
        return ({"message": "Invalid mem_id. Please provide a valid integer ID."}), 400
    except Exception as e:
        # Puedes registrar el error para depuración
        print("Error fetching data:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error fetching data")
    finally:
        cur.close()

@route_gimnasio.get('/membership-state/{mem_id}')
def get_membership_state(mem_id):
    try:
        mem_id = int(mem_id)
        cur = db.connection.cursor()
        cur.execute('SELECT mbs_state FROM membership WHERE mem_id = %(mem_id)s', {"mem_id": mem_id})
        result = cur.fetchone()

        if not result:
            return "Member not found"

        mem_state = result[0]
        return  mem_state

    except ValueError:
        return "Invalid mem_id. Please provide a valid integer ID."
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error creating details:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error creating details")





@route_gimnasio.get('/search-members/{pla_id}')
def get_member_by_place(pla_id):
    try:
        # Realiza la consulta para obtener información del miembro en ese lugar
        cur = db.connection.cursor()
        cur.execute(
            'SELECT * FROM public.member WHERE pla_id = %(pla_id)s ORDER BY mem_id ASC',
            {"pla_id": pla_id}
        )
        result = cur.fetchall()

        # Verifica si el miembro en ese lugar existe
        if not result:
            return "Member not found in the specified place"

        # Construye la respuesta con la información del miembro
        member_info = [{"mem_id": row[0], "pla_id": row[1],"mem_name": row[2],"mem_lastname": row[3],"mem_code": row[4],"mem_phone": row[5], "mem_email": row[6], "mem_location": row[7],"mem_password": row[8]} for row in result]

        return member_info
    except ValueError:
        return "Invalid pla_id or mem_id. Please provide valid integer IDs."
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error creating details:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error creating details")

        
        
@route_gimnasio.get('/places-by-owner/{own_id}')
def get_places_by_owner(own_id):
    try:
        own_id = int(own_id)
        cur = db.connection.cursor()
        cur.execute(
            'SELECT p.* FROM public.place p JOIN public.manage m ON p.pla_id = m.pla_id WHERE m.own_id = %(own_id)s',
            {"own_id": own_id}
        )
        result = cur.fetchall()

        if not result:
            return "Places not found for the specified owner"

        places_info = [{"pla_id": row[0], "pla_name": row[1], "pla_location": row[2], "pla_schedule": row[3], "pla_classschedule": row[4], "pla_type": row[5]} for row in result]

        return  places_info
    except ValueError:
        return "Invalid own_id. Please provide a valid integer ID."
    except Exception as e:
        print("Error:", str(e))
        return "An error occurred"


@route_gimnasio.get('/attendance-member/{mem_id}')
def get_attendance_by_member_id(mem_id):
    try:
        mem_id = int(mem_id)
        cur = db.connection.cursor()
        cur.execute('SELECT * FROM ATTENDANCE WHERE mem_id = %(mem_id)s', {"mem_id": mem_id})
        result = cur.fetchall()

        if not result:
            return "Attendance not found for member with mem_id={}".format(mem_id)

        # Convertir los resultados en una lista de diccionarios con nombres de columnas
        columns = [desc[0] for desc in cur.description]
        result_list = [dict(zip(columns, row)) for row in result]

        return (result_list)
    except ValueError:
        return "Invalid mem_id. Please provide a valid integer ID."
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error creating attendance:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error creating attendance")

# Rutas para la tabla ATTENDANCE
@route_gimnasio.get('/attendance')
def get_attendance():
    cur = db.connection.cursor()
    cur.execute('SELECT * FROM ATTENDANCE')
    result = cur.fetchall()
    return result

@route_gimnasio.get('/attendance/{att_id}')
def get_attendance_by_id(att_id):
    try:
        att_id = int(att_id)
        cur = db.connection.cursor()
        cur.execute('SELECT * FROM ATTENDANCE WHERE att_id = %(att_id)s', {"att_id": att_id})
        result = cur.fetchone()

        if not result:
            return "Attendance not found"

        columns = [desc[0] for desc in cur.description]
        result_dict = dict(zip(columns, result))

        return result_dict
    except ValueError:
        return "Invalid att_id. Please provide a valid integer ID."
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error creating attendance:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error creating attendance")


@route_gimnasio.post('/attendance')
def create_attendance(att: Attendance):
    new_attendance = {
        "pla_id": att.pla_id,
        "mem_id": att.mem_id,
        "att_entry": att.att_entry,
        "att_exit": att.att_exit
    }
    cur = db.connection.cursor()

    try:
        cur.execute('INSERT INTO ATTENDANCE (pla_id, mem_id, att_entry, att_exit) VALUES (%(pla_id)s, %(mem_id)s, %(att_entry)s, %(att_exit)s)', new_attendance)
        db.connection.commit()
        return "Attendance created successfully"
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error creating attendance:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error creating attendance")

@route_gimnasio.put('/attendance/{att_id}')
def update_attendance(att_id: int, updated_attendance: Attendance):
    cur = db.connection.cursor()
    try:
        att_id = int(att_id)
        cur.execute('UPDATE ATTENDANCE SET pla_id=%(pla_id)s, mem_id=%(mem_id)s, att_entry=%(att_entry)s, att_exit=%(att_exit)s WHERE att_id=%(att_id)s', 
                    {"att_id": att_id, "pla_id": updated_attendance.pla_id, "mem_id": updated_attendance.mem_id, "att_entry": updated_attendance.att_entry, "att_exit": updated_attendance.att_exit})
        db.connection.commit()

        # Obtiene el número de filas afectadas por la operación de actualización
        rows_updated = cur.rowcount

        if rows_updated > 0:
            return "Attendance updated successfully"
        else:
            return "Attendance not found. No attendance was updated."
    except ValueError:
        return "Invalid att_id. Please provide a valid integer ID."
    except Exception as e:
        db.connection.rollback()
        print("Error updating attendance:", str(e))
        raise HTTPException(status_code=500, detail="Error updating attendance")

@route_gimnasio.delete('/attendance/{att_id}')
def delete_attendance(att_id):
    try:
        att_id = int(att_id)
        cur = db.connection.cursor()
        cur.execute('DELETE FROM ATTENDANCE WHERE att_id=%s', (att_id,))
        # Obtiene el número de filas afectadas por la operación de eliminación
        rows_deleted = cur.rowcount
        db.connection.commit()

        if rows_deleted > 0:
            return "Attendance deleted successfully"
        else:
            return "Attendance not found. No attendance was deleted."
    except ValueError:
        return "Invalid att_id. Please provide a valid integer ID."
    except Exception as e:
        db.connection.rollback()
        print("Error deleting attendance:", str(e))
        raise HTTPException(status_code=500, detail="Error deleting attendance")

# Rutas para la tabla DETAILS
@route_gimnasio.get('/details')
def get_details():
    cur = db.connection.cursor()
    cur.execute('SELECT * FROM DETAILS')
    result = cur.fetchall()
    return result

@route_gimnasio.get('/details/{det_id}')
def get_detail(det_id):
    try:
        det_id = int(det_id)
        cur = db.connection.cursor()
        cur.execute('SELECT * FROM DETAILS WHERE det_id = %(det_id)s', {"det_id": det_id})
        result = cur.fetchall()

        if not result:
            return "Details not found"
        return result
    except ValueError:
        return "Invalid det_id. Please provide a valid integer ID."
    except Exception as e:
        print("Error:", str(e))
        return "An error occurred"

@route_gimnasio.post('/details')
def create_details(detail: Details):
    new_detail = {
        "inv_id": detail.inv_id,
        "det_description": detail.det_description,
        "det_price": detail.det_price,
        "det_amount": detail.det_amount
    }
    cur = db.connection.cursor()
    try:
        cur.execute('INSERT INTO DETAILS (inv_id, det_description, det_price, det_amount) VALUES (%(inv_id)s, %(det_description)s, %(det_price)s, %(det_amount)s)', new_detail)
        db.connection.commit()
        return "Details created successfully"
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error creating details:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error creating details")

@route_gimnasio.put('/details/{det_id}')
def update_details(det_id: int, updated_detail: Details):
    cur = db.connection.cursor()
    try:
        det_id = int(det_id)
        cur.execute('UPDATE DETAILS SET inv_id=%(inv_id)s, det_description=%(det_description)s, det_price=%(det_price)s, det_amount=%(det_amount)s WHERE det_id=%(det_id)s', 
                    {"det_id": det_id, "inv_id": updated_detail.inv_id, "det_description": updated_detail.det_description, "det_price": updated_detail.det_price, "det_amount": updated_detail.det_amount})
        db.connection.commit()

        # Obtiene el número de filas afectadas por la operación de actualización
        rows_updated = cur.rowcount

        if rows_updated > 0:
            return "Details updated successfully"
        else:
            return "Details not found. No details were updated."
    except ValueError:
        return "Invalid det_id. Please provide a valid integer ID."
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error updating details:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error updating details")

@route_gimnasio.delete('/details/{det_id}')
def delete_details(det_id: int):
    cur = db.connection.cursor()
    try:
        det_id = int(det_id)
        cur.execute('DELETE FROM DETAILS WHERE det_id=%s', (det_id,))
        # Obtiene el número de filas afectadas por la operación de eliminación
        rows_deleted = cur.rowcount
        db.connection.commit()

        if rows_deleted > 0:
            return "Details deleted successfully"
        else:
            return "Details not found. No details were deleted."
    except ValueError:
        return "Invalid det_id. Please provide a valid integer ID."
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error deleting details:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error deleting details")

# Rutas para la tabla DONATIONS
@route_gimnasio.get('/donations')
def get_donations():
    cur = db.connection.cursor()
    cur.execute('SELECT * FROM DONATIONS')
    result = cur.fetchall()
    return result

@route_gimnasio.get('/donations/{don_id}')
def get_donation(don_id):
    try:
        don_id = int(don_id)
        cur = db.connection.cursor()
        cur.execute('SELECT * FROM DONATIONS WHERE don_id = %(don_id)s', {"don_id": don_id})
        result = cur.fetchall()

        if not result:
            return "Donation not found"
        return result
    except ValueError:
        return "Invalid don_id. Please provide a valid integer ID."
    except Exception as e:
        print("Error:", str(e))
        return "An error occurred"

@route_gimnasio.post('/donations')
def create_donations(donation: Donations):
    new_donation = {
        "mem_id": donation.mem_id,
        "don_date": donation.don_date,
        "don_amount": donation.don_amount,
        "don_name": donation.don_name,
        "don_price": donation.don_price
    }
    cur = db.connection.cursor()
    try:
        cur.execute('INSERT INTO DONATIONS (mem_id, don_date, don_amount, don_name, don_price) VALUES (%(mem_id)s, %(don_date)s, %(don_amount)s, %(don_name)s, %(don_price)s)', new_donation)
        db.connection.commit()
        return "Donation created successfully"
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error creating donation:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error creating donation")

@route_gimnasio.put('/donations/{don_id}')
def update_donations(don_id: int, updated_donation: Donations):
    cur = db.connection.cursor()
    try:
        don_id = int(don_id)
        cur.execute('UPDATE DONATIONS SET mem_id=%(mem_id)s, don_date=%(don_date)s, don_amount=%(don_amount)s, don_name=%(don_name)s, don_price=%(don_price)s WHERE don_id=%(don_id)s', 
                    {"don_id": don_id, "mem_id": updated_donation.mem_id, "don_date": updated_donation.don_date, "don_amount": updated_donation.don_amount, "don_name": updated_donation.don_name, "don_price": updated_donation.don_price})
        db.connection.commit()

        # Obtiene el número de filas afectadas por la operación de actualización
        rows_updated = cur.rowcount

        if rows_updated > 0:
            return "Donation updated successfully"
        else:
            return "Donation not found. No donation was updated."
    except ValueError:
        return "Invalid don_id. Please provide a valid integer ID."
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error updating donation:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error updating donation")

@route_gimnasio.delete('/donations/{don_id}')
def delete_donations(don_id: int):
    cur = db.connection.cursor()
    try:
        don_id = int(don_id)
        cur.execute('DELETE FROM DONATIONS WHERE don_id=%s', (don_id,))
        # Obtiene el número de filas afectadas por la operación de eliminación
        rows_deleted = cur.rowcount
        db.connection.commit()

        if rows_deleted > 0:
            return "Donation deleted successfully"
        else:
            return "Donation not found. No donation was deleted."
    except ValueError:
        return "Invalid don_id. Please provide a valid integer ID."
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error deleting donation:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error deleting donation")

# Rutas para la tabla EXERCISE
@route_gimnasio.get('/exercise')
def get_exercises():
    cur = db.connection.cursor()
    cur.execute('SELECT * FROM EXERCISE')
    result = cur.fetchall()
    return result

@route_gimnasio.get('/exercise/{exe_id}')
def get_exercise(exe_id):
    try:
        exe_id = int(exe_id)
        cur = db.connection.cursor()
        cur.execute('SELECT * FROM EXERCISE WHERE exe_id = %(exe_id)s', {"exe_id": exe_id})
        result = cur.fetchall()

        if not result:
            return "Exercise not found"
        return result
    except ValueError:
        return "Invalid exe_id. Please provide a valid integer ID."
    except Exception as e:
        print("Error:", str(e))
        return "An error occurred"

@route_gimnasio.post('/exercise')
def create_exercise(exercise: Exercise):
    new_exercise = {
        "rou_id": exercise.rou_id,
        "exe_name": exercise.exe_name,
        "exe_set": exercise.exe_set,
        "exe_reps": exercise.exe_reps
    }
    cur = db.connection.cursor()
    try:
        cur.execute('INSERT INTO EXERCISE (rou_id, exe_name, exe_set, exe_reps) VALUES (%(rou_id)s, %(exe_name)s, %(exe_set)s, %(exe_reps)s)', new_exercise)
        db.connection.commit()
        return "Exercise created successfully"
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error creating exercise:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error creating exercise")

@route_gimnasio.put('/exercise/{exe_id}')
def update_exercise(exe_id: int, updated_exercise: Exercise):
    cur = db.connection.cursor()
    try:
        exe_id = int(exe_id)
        cur.execute('UPDATE EXERCISE SET rou_id=%(rou_id)s, exe_name=%(exe_name)s, exe_set=%(exe_set)s, exe_reps=%(exe_reps)s WHERE exe_id=%(exe_id)s', 
                    {"exe_id": exe_id, "rou_id": updated_exercise.rou_id, "exe_name": updated_exercise.exe_name, "exe_set": updated_exercise.exe_set, "exe_reps": updated_exercise.exe_reps})
        db.connection.commit()

        # Obtiene el número de filas afectadas por la operación de actualización
        rows_updated = cur.rowcount

        if rows_updated > 0:
            return "Exercise updated successfully"
        else:
            return "Exercise not found. No exercise was updated."
    except ValueError:
        return "Invalid exe_id. Please provide a valid integer ID."
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error updating exercise:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error updating exercise")

@route_gimnasio.delete('/exercise/{exe_id}')
def delete_exercise(exe_id: int):
    cur = db.connection.cursor()
    try:
        exe_id = int(exe_id)
        cur.execute('DELETE FROM EXERCISE WHERE exe_id=%s', (exe_id,))
        # Obtiene el número de filas afectadas por la operación de eliminación
        rows_deleted = cur.rowcount
        db.connection.commit()

        if rows_deleted > 0:
            return "Exercise deleted successfully"
        else:
            return "Exercise not found. No exercise was deleted."
    except ValueError:
        return "Invalid exe_id. Please provide a valid integer ID."
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error deleting exercise:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error deleting exercise")

# Rutas para la tabla INVOICE
@route_gimnasio.get('/invoice')
def get_invoices():
    cur = db.connection.cursor()
    cur.execute('SELECT * FROM INVOICE')
    result = cur.fetchall()
    return result

@route_gimnasio.get('/invoice/{inv_id}')
def get_invoice(inv_id):
    try:
        inv_id = int(inv_id)
        cur = db.connection.cursor()
        cur.execute('SELECT * FROM INVOICE WHERE inv_id = %(inv_id)s', {"inv_id": inv_id})
        result = cur.fetchall()

        if not result:
            return "Invoice not found"
        return result
    except ValueError:
        return "Invalid inv_id. Please provide a valid integer ID."
    except Exception as e:
        print("Error:", str(e))
        return "An error occurred"

@route_gimnasio.post('/invoice')
def create_invoice(invoice: Invoice):
    new_invoice = {
        "mem_id": invoice.mem_id,
        "inv_date": invoice.inv_date,
        "inv_number": invoice.inv_number,
        "inv_total": invoice.inv_total
    }
    cur = db.connection.cursor()
    try:
        cur.execute('INSERT INTO INVOICE (mem_id, inv_date, inv_number, inv_total) VALUES (%(mem_id)s, %(inv_date)s, %(inv_number)s, %(inv_total)s)', new_invoice)
        db.connection.commit()
        return "Invoice created successfully"
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error creating invoice:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error creating invoice")

@route_gimnasio.put('/invoice/{inv_id}')
def update_invoice(inv_id: int, updated_invoice: Invoice):
    cur = db.connection.cursor()
    try:
        inv_id = int(inv_id)
        cur.execute('UPDATE INVOICE SET mem_id=%(mem_id)s, inv_date=%(inv_date)s, inv_number=%(inv_number)s, inv_total=%(inv_total)s WHERE inv_id=%(inv_id)s', 
                    {"inv_id": inv_id, "mem_id": updated_invoice.mem_id, "inv_date": updated_invoice.inv_date, "inv_number": updated_invoice.inv_number, "inv_total": updated_invoice.inv_total})
        db.connection.commit()

        # Obtiene el número de filas afectadas por la operación de actualización
        rows_updated = cur.rowcount

        if rows_updated > 0:
            return "Invoice updated successfully"
        else:
            return "Invoice not found. No invoice was updated."
    except ValueError:
        return "Invalid inv_id. Please provide a valid integer ID."
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error updating invoice:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error updating invoice")

@route_gimnasio.delete('/invoice/{inv_id}')
def delete_invoice(inv_id: int):
    cur = db.connection.cursor()
    try:
        inv_id = int(inv_id)
        cur.execute('DELETE FROM INVOICE WHERE inv_id=%s', (inv_id,))
        # Obtiene el número de filas afectadas por la operación de eliminación
        rows_deleted = cur.rowcount
        db.connection.commit()

        if rows_deleted > 0:
            return "Invoice deleted successfully"
        else:
            return "Invoice not found. No invoice was deleted."
    except ValueError:
        return "Invalid inv_id. Please provide a valid integer ID."
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error deleting invoice:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error deleting invoice")


# Rutas para la tabla MANAGE
@route_gimnasio.get('/manage')
def get_manage():
    cur = db.connection.cursor()
    cur.execute('SELECT * FROM MANAGE')
    result = cur.fetchall()
    return result

@route_gimnasio.get('/manage/{pla_id}/{own_id}')
def get_manage(pla_id: int, own_id: int):
    try:
        cur = db.connection.cursor()
        cur.execute('SELECT * FROM MANAGE WHERE pla_id = %(pla_id)s AND own_id = %(own_id)s', {"pla_id": pla_id, "own_id": own_id})
        result = cur.fetchall()

        if not result:
            return "Manage not found"
        return result
    except Exception as e:
        print("Error:", str(e))
        return "An error occurred"

@route_gimnasio.post('/manage')
def create_manage(manage: Manage):
    new_manage = {
        "pla_id": manage.pla_id,
        "own_id": manage.own_id
    }
    cur = db.connection.cursor()
    try:
        cur.execute('INSERT INTO MANAGE (pla_id, own_id) VALUES (%(pla_id)s, %(own_id)s)', new_manage)
        db.connection.commit()
        return "Manage created successfully"
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error creating manage:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error creating manage")

@route_gimnasio.put('/manage/{pla_id}/{own_id}')
def update_manage(pla_id: int, own_id: int, updated_manage: Manage):
    cur = db.connection.cursor()
    try:
        cur.execute('UPDATE MANAGE SET pla_id=%(new_pla_id)s, own_id=%(new_own_id)s WHERE pla_id=%(pla_id)s AND own_id=%(own_id)s', 
                    {"new_pla_id": updated_manage.pla_id, "new_own_id": updated_manage.own_id, "pla_id": pla_id, "own_id": own_id})
        db.connection.commit()

        # Obtiene el número de filas afectadas por la operación de actualización
        rows_updated = cur.rowcount

        if rows_updated > 0:
            return "Manage updated successfully"
        else:
            return "Manage not found. No manage was updated."
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error updating manage:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error updating manage")

@route_gimnasio.delete('/manage/{pla_id}/{own_id}')
def delete_manage(pla_id: int, own_id: int):
    cur = db.connection.cursor()
    try:
        cur.execute('DELETE FROM MANAGE WHERE pla_id=%s AND own_id=%s', (pla_id, own_id))
        # Obtiene el número de filas afectadas por la operación de eliminación
        rows_deleted = cur.rowcount
        db.connection.commit()

        if rows_deleted > 0:
            return "Manage deleted successfully"
        else:
            return "Manage not found. No manage was deleted."
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error deleting manage:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error deleting manage")

# Rutas para la tabla MEMBER
@route_gimnasio.get('/member')
def get_members():
    cur = db.connection.cursor()
    cur.execute('SELECT * FROM MEMBER')
    result = cur.fetchall()
    return result

@route_gimnasio.get('/member/{mem_id}')
def get_member(mem_id: int):
    try:
        cur = db.connection.cursor()
        cur.execute('SELECT * FROM MEMBER WHERE mem_id = %(mem_id)s', {"mem_id": mem_id})
        result = cur.fetchall()

        if not result:
            return "Member not found"
        return result
    except Exception as e:
        print("Error:", str(e))
        return "An error occurred"

@route_gimnasio.post('/member')
def create_member(member: Member):
    new_member = {
        "pla_id": member.pla_id,
        "mem_name": member.mem_name,
        "mem_lastname": member.mem_lastname,
        "mem_code": member.mem_code,
        "mem_phone": member.mem_phone,
        "mem_email": member.mem_email,
        "mem_location": member.mem_location,
        "mem_password": member.mem_password
    }
    cur = db.connection.cursor()
    try:
        cur.execute('INSERT INTO MEMBER (pla_id, mem_name, mem_lastname, mem_code, mem_phone, mem_email, mem_location, mem_password) VALUES (%(pla_id)s, %(mem_name)s, %(mem_lastname)s, %(mem_code)s, %(mem_phone)s, %(mem_email)s, %(mem_location)s, %(mem_password)s)', new_member)
        db.connection.commit()
        return "Member created successfully"
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error creating member:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error creating member")

@route_gimnasio.put('/member/{mem_id}')
def update_member(mem_id: int, updated_member: Member):
    cur = db.connection.cursor()
    try:
        cur.execute('UPDATE MEMBER SET pla_id=%(new_pla_id)s, mem_name=%(mem_name)s, mem_lastname=%(mem_lastname)s, mem_code=%(mem_code)s, mem_phone=%(mem_phone)s, mem_email=%(mem_email)s, mem_location=%(mem_location)s, mem_password=%(mem_password)s WHERE mem_id=%(mem_id)s', 
                    {"new_pla_id": updated_member.pla_id, "mem_id": mem_id, "mem_name": updated_member.mem_name, "mem_lastname": updated_member.mem_lastname, "mem_code": updated_member.mem_code, "mem_phone": updated_member.mem_phone, "mem_email": updated_member.mem_email, "mem_location": updated_member.mem_location, "mem_password": updated_member.mem_password})
        db.connection.commit()

        # Obtiene el número de filas afectadas por la operación de actualización
        rows_updated = cur.rowcount

        if rows_updated > 0:
            return "Member updated successfully"
        else:
            return "Member not found. No member was updated."
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error updating member:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error updating member")

@route_gimnasio.delete('/member/{mem_id}')
def delete_member(mem_id: int):
    cur = db.connection.cursor()
    try:
        cur.execute('DELETE FROM MEMBER WHERE mem_id=%s', (mem_id,))
        # Obtiene el número de filas afectadas por la operación de eliminación
        rows_deleted = cur.rowcount
        db.connection.commit()

        if rows_deleted > 0:
            return "Member deleted successfully"
        else:
            return "Member not found. No member was deleted."
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error deleting member:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error deleting member")

# Rutas para la tabla MEMBERSHIP
@route_gimnasio.get('/membership')
def get_memberships():
    cur = db.connection.cursor()
    cur.execute('SELECT * FROM MEMBERSHIP')
    result = cur.fetchall()
    return result

@route_gimnasio.get('/membership/{mbs_id}')
def get_membership(mbs_id: int):
    try:
        cur = db.connection.cursor()
        cur.execute('SELECT * FROM MEMBERSHIP WHERE mbs_id = %(mbs_id)s', {"mbs_id": mbs_id})
        result = cur.fetchall()

        if not result:
            return "Membership not found"
        return result
    except Exception as e:
        print("Error:", str(e))
        return "An error occurred"
    
@route_gimnasio.post('/membership')
def create_membership(membership: Membership):
    new_membership = {
        "rou_id": membership.rou_id,
        "mem_id": membership.mem_id,
        "pro_id": membership.pro_id,
        "mbs_start_date": membership.mbs_start_date,
        "mbs_due_date": membership.mbs_due_date,
        "mbs_state": membership.mbs_state
    }
    cur = db.connection.cursor()
    try:
        cur.execute('INSERT INTO MEMBERSHIP (rou_id, mem_id, pro_id, mbs_start_date, mbs_due_date, mbs_state) VALUES (%(rou_id)s, %(mem_id)s, %(pro_id)s, %(mbs_start_date)s, %(mbs_due_date)s, %(mbs_state)s)', new_membership)
        db.connection.commit()
        return "Membership created successfully"
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error creating membership:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error creating membership")

@route_gimnasio.put('/membership/{mbs_id}')
def update_membership(mbs_id: int, updated_membership: Membership):
    cur = db.connection.cursor()
    try:
        cur.execute('UPDATE MEMBERSHIP SET rou_id=%(new_rou_id)s, mem_id=%(new_mem_id)s, pro_id=%(new_pro_id)s, mbs_start_date=%(new_mbs_star_date)s, mbs_due_date=%(new_mbs_due_date)s, mbs_state=%(new_mbs_state)s WHERE mbs_id=%(mbs_id)s', 
                    {"new_rou_id": updated_membership.rou_id, "new_mem_id": updated_membership.mem_id, "new_pro_id": updated_membership.pro_id, "new_mbs_star_date": updated_membership.mbs_star_date, "new_mbs_due_date": updated_membership.mbs_due_date, "new_mbs_state": updated_membership.mbs_state, "mbs_id": mbs_id})
        db.connection.commit()

        # Obtiene el número de filas afectadas por la operación de actualización
        rows_updated = cur.rowcount

        if rows_updated > 0:
            return "Membership updated successfully"
        else:
            return "Membership not found. No membership was updated."
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error updating membership:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error updating membership")


@route_gimnasio.delete('/membership/{mbs_id}')
def delete_membership(mbs_id: int):
    cur = db.connection.cursor()
    try:
        cur.execute('DELETE FROM MEMBERSHIP WHERE mbs_id=%s', (mbs_id,))
        # Obtiene el número de filas afectadas por la operación de eliminación
        rows_deleted = cur.rowcount
        db.connection.commit()

        if rows_deleted > 0:
            return "Membership deleted successfully"
        else:
            return "Membership not found. No membership was deleted."
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error deleting membership:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error deleting membership")
# Rutas para la tabla OWNER
@route_gimnasio.get('/owner')
def get_owners():
    cur = db.connection.cursor()
    cur.execute('SELECT * FROM OWNER')
    result = cur.fetchall()
    return result

@route_gimnasio.get('/owner/{own_id}')
def get_owner(own_id: int):
    try:
        cur = db.connection.cursor()
        cur.execute('SELECT * FROM OWNER WHERE own_id = %(own_id)s', {"own_id": own_id})
        result = cur.fetchall()

        if not result:
            return "Owner not found"
        return result
    except Exception as e:
        print("Error:", str(e))
        return "An error occurred"

@route_gimnasio.post('/owner')
def create_owner(owner: Owner):
    new_owner = {
        "own_name": owner.own_name,
        "own_lastname": owner.own_lastname,
        "own_email": owner.own_email,
        "own_password": owner.own_password,
        "own_role": owner.own_role
    }
    cur = db.connection.cursor()
    try:
        cur.execute('INSERT INTO OWNER (own_name, own_lastname, own_email, own_password, own_role) VALUES (%(own_name)s, %(own_lastname)s, %(own_email)s, %(own_password)s, %(own_role)s)', new_owner)
        db.connection.commit()
        return "Owner created successfully"
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error creating owner:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error creating owner")

@route_gimnasio.put('/owner/{own_id}')
def update_owner(own_id: int, updated_owner: Owner):
    cur = db.connection.cursor()
    try:
        cur.execute('UPDATE OWNER SET own_name=%(new_own_name)s, own_lastname=%(new_own_lastname)s, own_email=%(new_own_email)s, own_password=%(new_own_password)s, own_role=%(new_own_role)s WHERE own_id=%(own_id)s', 
                    {"new_own_name": updated_owner.own_name, "new_own_lastname": updated_owner.own_lastname, "new_own_email": updated_owner.own_email, "new_own_password": updated_owner.own_password, "new_own_role": updated_owner.own_role, "own_id": own_id})
        db.connection.commit()

        # Obtiene el número de filas afectadas por la operación de actualización
        rows_updated = cur.rowcount

        if rows_updated > 0:
            return "Owner updated successfully"
        else:
            return "Owner not found. No owner was updated."
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error updating owner:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error updating owner")

@route_gimnasio.delete('/owner/{own_id}')
def delete_owner(own_id: int):
    cur = db.connection.cursor()
    try:
        cur.execute('DELETE FROM OWNER WHERE own_id=%s', (own_id,))
        # Obtiene el número de filas afectadas por la operación de eliminación
        rows_deleted = cur.rowcount
        db.connection.commit()

        if rows_deleted > 0:
            return "Owner deleted successfully"
        else:
            return "Owner not found. No owner was deleted."
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error deleting owner:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error deleting owner")



# Rutas para la tabla PLACE
@route_gimnasio.get('/place')
def get_places():
    cur = db.connection.cursor()
    cur.execute('SELECT * FROM PLACE')
    result = cur.fetchall()
    return result

@route_gimnasio.get('/place/{pla_id}')
def get_place(pla_id):
    try:
        pla_id = int(pla_id)
        cur = db.connection.cursor()
        cur.execute('SELECT * FROM PLACE WHERE pla_id = %(pla_id)s', {"pla_id": pla_id})
        result = cur.fetchall()
        if not result:
            return "Place not found"
      

        places_info = [{"pla_id": row[0], "pla_name": row[1], "pla_location": row[2], "pla_schedule": row[3], "pla_classschedule": row[4], "pla_type": row[5]} for row in result]

        return places_info
    except ValueError:
        return "Invalid pla_id. Please provide a valid integer ID."
    except Exception as e:
        print("Error:", str(e))
        return "An error occurred"

@route_gimnasio.post('/place')
def create_place(place: Place):
    new_place = {
        "pla_name": place.pla_name,
        "pla_location": place.pla_location,
        "pla_schedule": place.pla_schedule,
        "pla_classschedule": place.pla_classschedule,
        "pla_type": place.pla_type
    }
    cur = db.connection.cursor()
    try:
        cur.execute('INSERT INTO PLACE (pla_name, pla_location, pla_schedule, pla_classschedule, pla_type) VALUES (%(pla_name)s, %(pla_location)s, %(pla_schedule)s, %(pla_classschedule)s, %(pla_type)s)', new_place)
        db.connection.commit()
        return "Place created successfully"
    except Exception as e:
        db.connection.rollback()
        print("Error created place:", str(e))
        raise HTTPException(status_code=500, detail="Error created place")
    

@route_gimnasio.post('/places-manage/{own_id}')
def create_place_with_manage(place: Place, own_id: int):
    new_place = {
        "pla_name": place.pla_name,
        "pla_location": place.pla_location,
        "pla_schedule": place.pla_schedule,
        "pla_classschedule": place.pla_classschedule,
        "pla_type": place.pla_type
    }

    cur = db.connection.cursor()
    try:
        # Inserta el nuevo lugar y devuelve el pla_id
        cur.execute('INSERT INTO PLACE (pla_name, pla_location, pla_schedule, pla_classschedule, pla_type) VALUES (%(pla_name)s, %(pla_location)s, %(pla_schedule)s, %(pla_classschedule)s, %(pla_type)s) RETURNING pla_id', new_place)
        new_place_id = cur.fetchone()[0]

        # Inserta la entrada correspondiente en la tabla 'manage'
        cur.execute('INSERT INTO manage (pla_id, own_id) VALUES (%s, %s)', (new_place_id, own_id))

        db.connection.commit()

        return {"place_id": new_place_id, "message": "Place and manage entry created successfully"}
    except Exception as e:
        db.connection.rollback()
        print("Error creating place and manage entry:", str(e))
        raise HTTPException(status_code=500, detail="Error creating place and manage entry")

@route_gimnasio.put('/place/{pla_id}')
def update_place(pla_id, updated_place: Place):
    try:
        cur = db.connection.cursor()
        pla_id = int(pla_id)
        # Ejecuta la consulta DELETE
        cur.execute('UPDATE PLACE SET pla_name=%(pla_name)s, pla_location=%(pla_location)s, pla_schedule=%(pla_schedule)s, pla_classschedule=%(pla_classschedule)s, pla_type=%(pla_type)s WHERE pla_id=%(pla_id)s', 
                {"pla_id": pla_id, "pla_name": updated_place.pla_name, "pla_location": updated_place.pla_location, "pla_schedule": updated_place.pla_schedule, "pla_classschedule": updated_place.pla_classschedule, "pla_type": updated_place.pla_type})
        # Obtiene el número de filas afectadas por la operación de eliminación
        rows_deleted = cur.rowcount
        db.connection.commit()

        if rows_deleted > 0:
            return "Place updated successfully"
        else:
            return "Place not found. No place was update."
    except ValueError:
        return "Invalid pla_id. Please provide a valid integer ID."
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error deleting place:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error deleting place")

@route_gimnasio.delete('/place/{pla_id}')
def delete_place(pla_id):
    try:
        pla_id = int(pla_id)
        cur = db.connection.cursor()
        cur.execute('DELETE FROM PLACE WHERE pla_id=%s', (pla_id,))
        # Obtiene el número de filas afectadas por la operación de eliminación
        rows_deleted = cur.rowcount
        db.connection.commit()

        if rows_deleted > 0:
            return "Place deleted successfully"
        else:
            return "Place not found. No place was deleted."
    except ValueError:
        return "Invalid pla_id. Please provide a valid integer ID."
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error deleting place:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error deleting place")
    
    
@route_gimnasio.delete('/place-delete/{pla_id}')
def delete_place(pla_id):
    try:
        pla_id = int(pla_id)
        cur = db.connection.cursor()

        # Eliminar entrada en MANAGE
        cur.execute('DELETE FROM MANAGE WHERE pla_id=%s', (pla_id,))

        # Eliminar el lugar
        cur.execute('DELETE FROM PLACE WHERE pla_id=%s', (pla_id,))

        # Obtener el número de filas afectadas por la operación de eliminación en PLACE
        rows_deleted = cur.rowcount
        db.connection.commit()

        if rows_deleted > 0:
            return "Place and corresponding manage entry deleted successfully"
        else:
            return "Place not found. No place or manage entry was deleted."
    except ValueError:
        return "Invalid pla_id. Please provide a valid integer ID."
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error deleting place:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error deleting place")

# Rutas para la tabla PRODUCT
@route_gimnasio.get('/product')
def get_products():
    cur = db.connection.cursor()
    cur.execute('SELECT * FROM PRODUCT')
    result = cur.fetchall()
    return result

@route_gimnasio.get('/product/{pro_id}')
def get_product(pro_id):
    try:
        pro_id = int(pro_id)
        cur = db.connection.cursor()
        cur.execute('SELECT * FROM PRODUCT WHERE pro_id = %(pro_id)s', {"pro_id": pro_id})
        result = cur.fetchall()

        if not result:
            return "Product not found"
        return result
    except ValueError:
        return "Invalid pro_id. Please provide a valid integer ID."
    except Exception as e:
        print("Error:", str(e))
        return "An error occurred"

@route_gimnasio.post('/product')
def create_product(product: Product):
    new_product = {
        "inv_id": product.inv_id,
        "pro_name": product.pro_name,
        "pro_description": product.pro_description,
        "pro_cost": product.pro_cost,
        "pro_stock": product.pro_stock,
        "pro_category": product.pro_category,
        "pro_duration": product.pro_duration,
        "pro_benefits": product.pro_benefits
    }
    cur = db.connection.cursor()
    try:
        cur.execute('INSERT INTO PRODUCT (inv_id, pro_name, pro_description, pro_cost, pro_stock, pro_category, pro_duration, pro_benefits) VALUES (%(inv_id)s, %(pro_name)s, %(pro_description)s, %(pro_cost)s, %(pro_stock)s, %(pro_category)s, %(pro_duration)s, %(pro_benefits)s)', new_product)
        db.connection.commit()
        return "Product created successfully"
    except Exception as e:
        db.connection.rollback()
        print("Error creating product:", str(e))
        raise HTTPException(status_code=500, detail="Error creating product")

@route_gimnasio.put('/product/{pro_id}')
def update_product(pro_id: int, updated_product: Product):
    cur = db.connection.cursor()
    try:
        pro_id = int(pro_id)
        cur.execute('UPDATE PRODUCT SET inv_id=%(inv_id)s, pro_name=%(pro_name)s, pro_description=%(pro_description)s, pro_cost=%(pro_cost)s, pro_stock=%(pro_stock)s, pro_category=%(pro_category)s, pro_duration=%(pro_duration)s, pro_benefits=%(pro_benefits)s WHERE pro_id=%(pro_id)s', 
                    {"pro_id": pro_id, "inv_id": updated_product.inv_id, "pro_name": updated_product.pro_name, "pro_description": updated_product.pro_description, "pro_cost": updated_product.pro_cost, "pro_stock": updated_product.pro_stock, "pro_category": updated_product.pro_category, "pro_duration": updated_product.pro_duration, "pro_benefits": updated_product.pro_benefits})
        db.connection.commit()

        # Obtiene el número de filas afectadas por la operación de actualización
        rows_updated = cur.rowcount

        if rows_updated > 0:
            return "Product updated successfully"
        else:
            return "Product not found. No product was updated."
    except ValueError:
        return "Invalid pro_id. Please provide a valid integer ID."
    except Exception as e:
        db.connection.rollback()
        print("Error updating product:", str(e))
        raise HTTPException(status_code=500, detail="Error updating product")

@route_gimnasio.delete('/product/{pro_id}')
def delete_product(pro_id):
    try:
        pro_id = int(pro_id)
        cur = db.connection.cursor()
        cur.execute('DELETE FROM PRODUCT WHERE pro_id=%s', (pro_id,))
        # Obtiene el número de filas afectadas por la operación de eliminación
        rows_deleted = cur.rowcount
        db.connection.commit()

        if rows_deleted > 0:
            return "Product deleted successfully"
        else:
            return "Product not found. No product was deleted."
    except ValueError:
        return "Invalid pro_id. Please provide a valid integer ID."
    except Exception as e:
        db.connection.rollback()
        print("Error deleting product:", str(e))
        raise HTTPException(status_code=500, detail="Error deleting product")


# Rutas para la tabla RESERVATION
@route_gimnasio.get('/reservation')
def get_reservations():
    cur = db.connection.cursor()
    cur.execute('SELECT * FROM RESERVATION')
    result = cur.fetchall()
    return result

@route_gimnasio.get('/reservation/{res_id}')
def get_reservation(res_id: int):
    try:
        cur = db.connection.cursor()
        cur.execute('SELECT * FROM RESERVATION WHERE res_id = %(res_id)s', {"res_id": res_id})
        result = cur.fetchall()

        if not result:
            return "Reservation not found"
        return result
    except Exception as e:
        print("Error:", str(e))
        return "An error occurred"

@route_gimnasio.post('/reservation')
def create_reservation(reservation: Reservation):
    new_reservation = {
        "mem_id": reservation.mem_id,
        "pla_id": reservation.pla_id,
        "res_date": reservation.res_date,
        "res_hour": reservation.res_hour,
        "res_state": reservation.res_state
    }
    cur = db.connection.cursor()
    try:
        cur.execute('INSERT INTO RESERVATION (mem_id, pla_id, res_date, res_hour, res_state) VALUES (%(mem_id)s, %(pla_id)s, %(res_date)s, %(res_hour)s, %(res_state)s)', new_reservation)
        db.connection.commit()
        return "Reservation created successfully"
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error creating reservation:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error creating reservation")

@route_gimnasio.put('/reservation/{res_id}')
def update_reservation(res_id: int, updated_reservation: Reservation):
    cur = db.connection.cursor()
    try:
        cur.execute('UPDATE RESERVATION SET mem_id=%(new_mem_id)s, pla_id=%(new_pla_id)s, res_date=%(new_res_date)s, res_hour=%(new_res_hour)s, res_state=%(new_res_state)s WHERE res_id=%(res_id)s', 
                    {"new_mem_id": updated_reservation.mem_id, "new_pla_id": updated_reservation.pla_id, "new_res_date": updated_reservation.res_date, "new_res_hour": updated_reservation.res_hour, "new_res_state": updated_reservation.res_state, "res_id": res_id})
        db.connection.commit()

        # Obtiene el número de filas afectadas por la operación de actualización
        rows_updated = cur.rowcount

        if rows_updated > 0:
            return "Reservation updated successfully"
        else:
            return "Reservation not found. No reservation was updated."
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error updating reservation:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error updating reservation")

@route_gimnasio.delete('/reservation/{res_id}')
def delete_reservation(res_id: int):
    cur = db.connection.cursor()
    try:
        cur.execute('DELETE FROM RESERVATION WHERE res_id=%s', (res_id,))
        # Obtiene el número de filas afectadas por la operación de eliminación
        rows_deleted = cur.rowcount
        db.connection.commit()

        if rows_deleted > 0:
            return "Reservation deleted successfully"
        else:
            return "Reservation not found. No reservation was deleted."
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error deleting reservation:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error deleting reservation")

# Rutas para la tabla ROUTINE
@route_gimnasio.get('/routine')
def get_routines():
    cur = db.connection.cursor()
    cur.execute('SELECT * FROM ROUTINE')
    result = cur.fetchall()
    return result

@route_gimnasio.get('/routine/{rou_id}')
def get_routine(rou_id: int):
    try:
        cur = db.connection.cursor()
        cur.execute('SELECT * FROM ROUTINE WHERE rou_id = %(rou_id)s', {"rou_id": rou_id})
        result = cur.fetchall()

        if not result:
            return "Routine not found"
        return result
    except Exception as e:
        print("Error:", str(e))
        return "An error occurred"

@route_gimnasio.post('/routine')
def create_routine(routine: Routine):
    new_routine = {
        "mbs_id": routine.mbs_id,
        "rou_type": routine.rou_type,
        "rou_name": routine.rou_name
    }
    cur = db.connection.cursor()
    try:
        cur.execute('INSERT INTO ROUTINE (mbs_id, rou_type, rou_name) VALUES (%(mbs_id)s, %(rou_type)s, %(rou_name)s)', new_routine)
        db.connection.commit()
        return "Routine created successfully"
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error creating routine:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error creating routine")

@route_gimnasio.put('/routine/{rou_id}')
def update_routine(rou_id: int, updated_routine: Routine):
    cur = db.connection.cursor()
    try:
        cur.execute('UPDATE ROUTINE SET mbs_id=%(new_mbs_id)s, rou_type=%(new_rou_type)s, rou_name=%(new_rou_name)s WHERE rou_id=%(rou_id)s', 
                    {"new_mbs_id": updated_routine.mbs_id, "new_rou_type": updated_routine.rou_type, "new_rou_name": updated_routine.rou_name, "rou_id": rou_id})
        db.connection.commit()

        # Obtiene el número de filas afectadas por la operación de actualización
        rows_updated = cur.rowcount

        if rows_updated > 0:
            return "Routine updated successfully"
        else:
            return "Routine not found. No routine was updated."
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error updating routine:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error updating routine")

@route_gimnasio.delete('/routine/{rou_id}')
def delete_routine(rou_id: int):
    cur = db.connection.cursor()
    try:
        cur.execute('DELETE FROM ROUTINE WHERE rou_id=%s', (rou_id,))
        # Obtiene el número de filas afectadas por la operación de eliminación
        rows_deleted = cur.rowcount
        db.connection.commit()

        if rows_deleted > 0:
            return "Routine deleted successfully"
        else:
            return "Routine not found. No routine was deleted."
    except Exception as e:
        # En caso de error, revertir la transacción
        db.connection.rollback()
        # Puedes registrar el error para depuración
        print("Error deleting routine:", str(e))
        # Lanzar una excepción HTTP para informar del error al cliente
        raise HTTPException(status_code=500, detail="Error deleting routine")
