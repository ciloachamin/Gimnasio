
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