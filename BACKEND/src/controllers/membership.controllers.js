import { response } from "express";
import { connectDB } from "../db.js";
import axios from "axios";
const url = await connectDB();

// Obtener todas las membresías
export const getMemberships = async (req, res, next) => {
  try {
    const response = await axios.get(`${url}/membership`);
    const memberships = response.data;
    return res.status(200).json(memberships);
  } catch (error) {
    return next(error);
  }
};

// Obtener una membresía por ID
export const getMembershipById = async (req, res, next) => {
  try {
    const membershipId = req.params.mbs_id;
    const response = await axios.get(`${url}/membership/${membershipId}`);
    const membership = response.data;
    if (membership === "Membership not found") {
      return res.status(404).json({ message: "Membresía no encontrada" });
    }
    return res.status(200).json(membership);
  } catch (error) {
    return next(error);
  }
};

// Crear una nueva membresía
export const createMembership = async (req, res, next) => {
  try {
    const response = await axios.post(`${url}/membership`, req.body);
    return res.json("Membresía creada con éxito");
  } catch (error) {
    console.error('Error al crear la membresía: ', error);
    return res.status(500).json({ message: 'Error al crear la membresía' });
  }
};

// Actualizar una membresía por ID
export const updateMembership = async (req, res, next) => {
  try {
    const membershipId = req.params.mbs_id;
    const response = await axios.put(`${url}/membership/${membershipId}`, req.body);
    const updatedMembershipData = response.data;
    if (updatedMembershipData === "Membership updated successfully") {
      return res.status(200).json({ message: "Membresía actualizada con éxito" });
    } else {
      return res.status(404).json({ message: "Membresía no encontrada" });
    }
  } catch (error) {
    return next(error);
  }
};

// Eliminar una membresía por ID
export const deleteMembership = async (req, res, next) => {
  try {
    const membershipId = req.params.mbs_id;
    const response = await axios.delete(`${url}/membership/${membershipId}`);
    if (response.data === "Membership deleted successfully") {
      return res.status(200).json({ message: "Membresía eliminada con éxito" });
    } else {
      return res.status(404).json({ message: "Membresía no encontrada" });
    }
  } catch (error) {
    return next(error);
  }
};
