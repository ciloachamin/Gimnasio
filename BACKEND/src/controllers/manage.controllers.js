import { response } from "express";
import { connectDB } from "../db.js";
import axios from "axios";
const url = await connectDB();

// Obtener todos los registros de MANAGE
export const getManages = async (req, res, next) => {
  try {
    const response = await axios.get(`${url}/manage`);
    const manageRecords = response.data;
    return res.status(200).json(manageRecords);
  } catch (error) {
    return next(error);
  }
};

// Obtener una factura por ID
export const getManageById = async (req, res, next) => {
    try {
      const manageId = req.params.man_id;
      // Verificar si invoiceId es un número
      if (!/^\d+$/.test(manageId)) {
        return res.status(400).json({ message: "El ID de la Manage debe ser un número entero válido" });
      }
      const response = await axios.get(`${url}/invoice/${manageId}`);
      const manage = response.data;
      if (manage === "Manage not found") {
        return res.status(404).json({ message: "Manage no encontrada" });
      }
      return res.status(200).json(manage);
    } catch (error) {
      return next(error);
    }
  };
  

// Crear un nuevo registro en MANAGE
export const createManage = async (req, res, next) => {
  try {
    const response = await axios.post(`${url}/manage`, req.body);
    return res.json("Registro en MANAGE creado con éxito");
  } catch (error) {
    console.error('Error al crear el registro en MANAGE: ', error);
    return res.status(500).json({ message: 'Error al crear el registro en MANAGE' });
  }
};

// Actualizar un registro en MANAGE por ID de lugar y ID de propietario
export const updateManage = async (req, res, next) => {
  try {
    const placeId = req.params.pla_id;
    const ownerId = req.params.own_id;
    const response = await axios.put(`${url}/manage`, { pla_id: placeId, own_id: ownerId, ...req.body });
    const updatedManageRecordData = response.data;
    if (updatedManageRecordData === "Manage updated successfully") {
      return res.status(200).json({ message: "Registro en MANAGE actualizado con éxito" });
    } else {
      return res.status(404).json({ message: "Registro en MANAGE no encontrado" });
    }
  } catch (error) {
    return next(error);
  }
};

// Eliminar un registro en MANAGE por ID de lugar y ID de propietario
export const deleteManage = async (req, res, next) => {
  try {
    const placeId = req.params.pla_id;
    const ownerId = req.params.own_id;
    const response = await axios.delete(`${url}/manage`, { data: { pla_id: placeId, own_id: ownerId } });
    if (response.data === "Manage deleted successfully") {
      return res.status(200).json({ message: "Registro en MANAGE eliminado con éxito" });
    } else {
      return res.status(404).json({ message: "Registro en MANAGE no encontrado" });
    }
  } catch (error) {
    return next(error);
  }
};
