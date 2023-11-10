import psycopg2

try:
    connection = psycopg2.connect(
        user="postgres",
        password="123456",
        host="localhost",
        port="5432",
        database="gimnasio"
    )

    print("Database connected successfully")

except (Exception, psycopg2.Error) as error:
    print("Error: ", error)

    

