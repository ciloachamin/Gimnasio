import { response } from "express";
import { connectDB } from "../db.js";
import axios from "axios";
const url = await connectDB();

// Obtener todos los miembros
export const getMembers = async (req, res, next) => {
  try {
    const response = await axios.get(`${url}/member`);
    const members = response.data;
    return res.status(200).json(members);
  } catch (error) {
    return next(error);
  }
};

// Obtener un miembro por ID
export const getMemberById = async (req, res, next) => {
  try {
    const memberId = req.params.mem_id;
    const response = await axios.get(`${url}/member/${memberId}`);
    const member = response.data;
    if (member === "Member not found") {
      return res.status(404).json({ message: "Miembro no encontrado" });
    }
    return res.status(200).json(member);
  } catch (error) {
    return next(error);
  }
};

// Crear un nuevo miembro
export const createMember = async (req, res, next) => {
  try {
    const response = await axios.post(`${url}/member`, req.body);
    return res.json("Miembro creado con éxito");
  } catch (error) {
    console.error('Error al crear el miembro: ', error);
    return res.status(500).json({ message: 'Error al crear el miembro' });
  }
};

// Actualizar un miembro por ID
export const updateMember = async (req, res, next) => {
  try {
    const memberId = req.params.mem_id;
    const response = await axios.put(`${url}/member/${memberId}`, req.body);
    const updatedMemberData = response.data;
    if (updatedMemberData === "Member updated successfully") {
      return res.status(200).json({ message: "Miembro actualizado con éxito" });
    } else {
      return res.status(404).json({ message: "Miembro no encontrado" });
    }
  } catch (error) {
    return next(error);
  }
};

// Eliminar un miembro por ID
export const deleteMember = async (req, res, next) => {
  try {
    const memberId = req.params.mem_id;
    const response = await axios.delete(`${url}/member/${memberId}`);
    if (response.data === "Member deleted successfully") {
      return res.status(200).json({ message: "Miembro eliminado con éxito" });
    } else {
      return res.status(404).json({ message: "Miembro no encontrado" });
    }
  } catch (error) {
    return next(error);
  }
};
