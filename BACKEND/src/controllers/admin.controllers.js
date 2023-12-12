
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
