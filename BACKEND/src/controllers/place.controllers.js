import {connectDB} from "../db.js";
import axios from "axios";
const url = await connectDB(); 

// Obtener todos los lugares (places)
export const getPlaces = async (req, res, next) => {
  try {
    const response = await axios.get(`${url}/place`);
    const place = response.data;
    return res.status(200).json(place);
  } catch (error) {
    return next(error);
  }
};

export const getPlace = async (req, res, next) => {
    try {
      const placeId = req.params.id;
      // Verificar si productId es un número
      if (!/^\d+$/.test(placeId)) {
        return res.status(400).json({ message: "El ID del producto debe ser un número entero válido" });
      }
      const response = await axios.get(`${url}/place/${placeId}`);
      const place = response.data;
      console.log(place);
      if (place==="Place not found") {
        return res.status(404).json({ message: "Lugar no encontrado" });
      }
      return res.status(200).json(place);
    } catch (error) {
      return next(error);
    }
  };
  
// Crear un nuevo lugar (place)
export const createPlace = async (req, res, next) => {
    try {
      const response = await axios.post(`${url}/place`, req.body);
      return res.json("Lugar creado con éxito");
    } catch (error) {
        console.error('Error al crear el lugar: ', error);
        return res.status(500).json({ message: 'Error al crear el lugar' });
    }
  };
  
// Actualizar un lugar (place) por ID
export const updatePlace = async (req, res, next) => {
    try {
      const placeId = req.params.id;
      // Verificar si productId es un número
      if (!/^\d+$/.test(placeId)) {
        return res.status(400).json({ message: "El ID del producto debe ser un número entero válido" });
      }
        const response = await axios.put(`${url}/place/${placeId}`, req.body);
        const updatedPlaceData = response.data;
        if (updatedPlaceData === "Invalid pla_id. Please provide a valid integer ID.") {
          return res.status(400).json({ message: "ID no válido. Proporcione un ID entero válido." });
        } else if (updatedPlaceData === "Place updated successfully") {
          return res.status(200).json({ message: "Lugar actualizado con éxito" });
        } else {
          return res.status(404).json({ message: "Lugar no encontrado" });
        }
      } catch (error) {
        return next(error);
      }
  };
  

// Eliminar un lugar (place) por ID
export const deletePlace = async (req, res, next) => {
    try {
      const placeId = req.params.id;
      // Verificar si productId es un número
      if (!/^\d+$/.test(placeId)) {
        return res.status(400).json({ message: "El ID del producto debe ser un número entero válido" });
      }
      const response = await axios.delete(`${url}/place/${placeId}`);
      if (response.data === "Invalid pla_id. Please provide a valid integer ID.") {
        return res.status(400).json({ message: "ID no válido. Proporcione un ID entero válido." });
      } else if (response.data === "Place deleted successfully") {
        return res.status(200).json({ message: "Lugar eliminado con éxito" });
      } else {
        return res.status(404).json({ message: "Lugar no encontrado" });
      }
    } catch (error) {
      return next(error);
    }
  };
  