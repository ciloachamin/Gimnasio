
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
