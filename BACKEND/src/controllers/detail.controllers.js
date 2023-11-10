import { response } from "express";
import { connectDB } from "../db.js";
import axios from "axios";
const url = await connectDB();

// Obtener todos los detalles
export const getDetails = async (req, res, next) => {
  try {
    const response = await axios.get(`${url}/details`);
    const details = response.data;
    return res.status(200).json(details);
  } catch (error) {
    return next(error);
  }
};

// Obtener un detalle por ID
export const getDetailById = async (req, res, next) => {
  try {
    const detailId = req.params.det_id;
    // Verificar si detailId es un número
    if (!/^\d+$/.test(detailId)) {
      return res.status(400).json({ message: "El ID del detalle debe ser un número entero válido" });
    }
    const response = await axios.get(`${url}/details/${detailId}`);
    const detail = response.data;
    if (detail === "Detail not found") {
      return res.status(404).json({ message: "Detalle no encontrado" });
    }
    return res.status(200).json(detail);
  } catch (error) {
    return next(error);
  }
};

// Crear un nuevo detalle
export const createDetail = async (req, res, next) => {
  try {
    const response = await axios.post(`${url}/details`, req.body);
    return res.json("Detalle creado con éxito");
  } catch (error) {
    console.error('Error al crear el detalle: ', error);
    return res.status(500).json({ message: 'Error al crear el detalle' });
  }
};

// Actualizar un detalle por ID
export const updateDetail = async (req, res, next) => {
  try {
    const detailId = req.params.det_id;
    // Verificar si detailId es un número
    if (!/^\d+$/.test(detailId)) {
      return res.status(400).json({ message: "El ID del detalle debe ser un número entero válido" });
    }
    const response = await axios.put(`${url}/details/${detailId}`, req.body);
    const updatedDetailData = response.data;
    if (updatedDetailData === "Invalid det_id. Please provide a valid integer ID.") {
      return res.status(400).json({ message: "ID no válido. Proporcione un ID entero válido." });
    } else if (updatedDetailData === "Detail updated successfully") {
      return res.status(200).json({ message: "Detalle actualizado con éxito" });
    } else {
      return res.status(404).json({ message: "Detalle no encontrado" });
    }
  } catch (error) {
    return next(error);
  }
};

// Eliminar un detalle por ID
export const deleteDetail = async (req, res, next) => {
  try {
    const detailId = req.params.det_id;
    // Verificar si detailId es un número
    if (!/^\d+$/.test(detailId)) {
      return res.status(400).json({ message: "El ID del detalle debe ser un número entero válido" });
    }
    const response = await axios.delete(`${url}/details/${detailId}`);
    if (response.data === "Invalid det_id. Please provide a valid integer ID.") {
      return res.status(400).json({ message: "ID no válido. Proporcione un ID entero válido." });
    } else if (response.data === "Detail deleted successfully") {
      return res.status(200).json({ message: "Detalle eliminado con éxito" });
    } else {
      return res.status(404).json({ message: "Detalle no encontrado" });
    }
  } catch (error) {
    return next(error);
  }
};
