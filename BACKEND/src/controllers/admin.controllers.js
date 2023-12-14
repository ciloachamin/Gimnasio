
import { connectDB } from "../db.js";
import axios from "axios";
const url = await connectDB();


// Obtener un detalle por ID
export const getPlaceByOwner = async (req, res, next) => {
  try {
    const ownerId = req.params.owner_id;
    // Verificar si owner_id es un número
    if (!/^\d+$/.test(ownerId)) {
      return res.status(400).json({ message: "El ID del detalle debe ser un número entero válido" });
    }
    const response = await axios.get(`${url}/places-by-owner/${ownerId}`);
    const place = response.data;
    console.log(place);
    if (place === "Places not found for the specified owner") {
      return res.status(200).json({ message: "Lugares no encontrado" });
    }
    return res.status(200).json(place);
  } catch (error) {
    return next(error);
  }
};

// Crear un nuevo lugar (place) y asociarlo al propietario (owner)
export const createPlacebyOwner = async (req, res, next) => {
  try {
    // Primero, crea el lugar
    const placeResponse = await axios.post(`${url}/places-manage/1`, req.body); // Reemplaza '1' con el valor de own_id deseado
    const newPlaceId = placeResponse.data.place_id;

    console.log("Place created successfully with ID:", newPlaceId);
    return res.json("Lugar creado con éxito");
  } catch (error) {
    console.error('Error al crear el lugar: ', error);
    return res.status(500).json({ message: 'Error al crear el lugar' });
  }
};


// Eliminar un lugar (place) por ID
export const deletePlacebyOwner = async (req, res, next) => {
  try {
    const placeId = req.params.owner_id;
    // Verificar si productId es un número
    if (!/^\d+$/.test(placeId)) {
      return res.status(400).json({ message: "El ID del producto debe ser un número entero válido" });
    }
    const response = await axios.delete(`${url}/place-delete/${placeId}`);

    console.log(response.data);


    if (response.data === "Invalid pla_id. Please provide a valid integer ID.") {
      return res.status(400).json({ message: "ID no válido. Proporcione un ID entero válido." });
    } else if (response.data === "Place and corresponding manage entry deleted successfully") {
      return res.status(200).json({ message: "Lugar eliminado con éxito" });
    } else {
      return res.status(404).json({ message: "Lugar no encontrado" });
    }
  } catch (error) {
    return next(error);
  }
};

export const searchMember = async (req, res, next) => {
  try {
    const pla_id = req.params.place_id;
    const searchTerm = req.query.q;

    // Realizar la búsqueda en tu base de datos o servicio de datos
    // Reemplaza esta línea con la lógica de búsqueda específica de tu aplicación
    const response = await axios.get(`${url}/search-members/${pla_id}`);

    const members = response.data;
    console.log("members");
    console.log(members);

    if (members.length === 0) {
      return res.json({ message: "No se encontraron miembros para el término de búsqueda proporcionado" });
    }
    if (members === "Member not found in the specified place") {
      return res.json([]);
    }


    // Filtrar miembros que coinciden con la palabra clave en id, name, correo o code
    const results = members.filter((member) => {
      // Verificar si member es un objeto válido antes de acceder a sus propiedades
      if (member && typeof member === 'object') {
        console.log(member.mem_id);

        return (
          member.mem_id.toString().includes(searchTerm) ||
          member.mem_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.mem_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.mem_code.toString().includes(searchTerm)
        );
      }
      return false; // No es un objeto válido, no se incluirá en los resultados
    });

    if (results.length === 0) {
      return res.json([]);
    }

    return res.status(200).json(results);
  } catch (error) {
    return next(error);
  }
};


export const membershipState = async (req, res, next) => {
  try {
    const mem_id = req.params.mem_id;
    const response = await axios.get(`${url}/membership-state/${mem_id}`);
    const member = response.data;
    if (member === "Member not found") {
      return res.status(200).json(null);
    }

    return res.status(200).json(member);
  } catch (error) {
    return next(error);
  }
};



export const attendanceMember = async (req, res, next) => {
  try {
    const mem_id = req.params.mem_id;
    const response = await axios.get(`${url}/attendance-member/${mem_id}`);
    const attendances = response.data;

    console.log("attendances");
    console.log(attendances);

    if (attendances === "Attendace the member not found") {
      return res.status(200).json(null);
    }

    // Extracting and formatting date, time, and calculating stay duration
    const formattedAttendances = attendances.map((attendance) => {
      const entryTime = new Date(attendance.att_entry);

      let exitTime = null;
      let att_exit_date = "No registrada";
      let att_exit_time = "No registrada";
      let stayDuration = "...";

      if (attendance.att_exit) {
        exitTime = new Date(attendance.att_exit);

        const stayDurationMs = exitTime - entryTime;
        const stayDurationHours = Math.floor(stayDurationMs / (1000 * 60 * 60));
        const stayDurationMinutes = Math.floor((stayDurationMs % (1000 * 60 * 60)) / (1000 * 60));
        const stayDurationSeconds = Math.floor((stayDurationMs % (1000 * 60)) / 1000);

        stayDuration = `${stayDurationHours}:${stayDurationMinutes}:${stayDurationSeconds}`;
        att_exit_date = exitTime.toLocaleDateString();
        att_exit_time = exitTime.toLocaleTimeString();
      }

      return {
        att_id: attendance.att_id,
        pla_id: attendance.pla_id,
        mem_id: attendance.mem_id,
        att_entry_date: entryTime.toLocaleDateString(),
        att_entry_time: entryTime.toLocaleTimeString(),
        att_exit_date,
        att_exit_time,
        stay_duration: stayDuration,
      };
    });

    return res.status(200).json(formattedAttendances);
  } catch (error) {
    return next(error);
  }
};


export const memberInfo = async (req, res, next) => {
  try {
    const mem_id = req.params.mem_id;

    const response = await axios.get(`${url}/member-info/${mem_id}`);
    const memberInfo = response.data;

    if (!memberInfo || memberInfo.length === 0) {
      return res.status(404).json({ message: `No data found for member with MEM_ID=${mem_id}` });
    }

    const newUser = {
      ...memberInfo,
      last_reservation_date: memberInfo.last_reservation_date ? memberInfo.last_reservation_date : "No disponible",
      reservation_state: memberInfo.reservation_state ? memberInfo.reservation_state : "No disponible",
      reservation_hour: memberInfo.reservation_hour ? memberInfo.reservation_hour : "No disponible",
      mbs_id: memberInfo.mbs_id ? memberInfo.mbs_id : "No disponible",
      membership_state: memberInfo.membership_state ? memberInfo.membership_state : "No disponible",
      mbs_start_date: memberInfo.mbs_start_date ? memberInfo.mbs_start_date : "No disponible",
      mbs_due_date: memberInfo.mbs_due_date ? memberInfo.mbs_due_date : "No disponible",
      membership_name: memberInfo.membership_name ? memberInfo.membership_name : "No disponible",


    };

    return res.status(200).json(newUser);
  } catch (error) {
    return next(error);
  }
};
