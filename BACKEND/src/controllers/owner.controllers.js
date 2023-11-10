import { response } from "express";
import { connectDB } from "../db.js";
import axios from "axios";
const url = await connectDB();

// Obtener todos los propietarios
export const getOwners = async (req, res, next) => {
  try {
    const response = await axios.get(`${url}/owner`);
    const owners = response.data;
    return res.status(200).json(owners);
  } catch (error) {
    return next(error);
  }
};

// Obtener un propietario por ID
export const getOwnerById = async (req, res, next) => {
  try {
    const ownerId = req.params.own_id;
    const response = await axios.get(`${url}/owner/${ownerId}`);
    const owner = response.data;
    if (owner === "Owner not found") {
      return res.status  (404).json({ message: "Propietario no encontrado" });
    }
    return res.status(200).json(owner);
  } catch (error) {
    return next(error);
  }
};

// Crear un nuevo propietario
export const createOwner = async (req, res, next) => {
  try {
    const response = await axios.post(`${url}/owner`, req.body);
    return res.json("Propietario creado con éxito");
  } catch (error) {
    console.error('Error al crear el propietario: ', error);
    return res.status(500).json({ message: 'Error al crear el propietario' });
  }
};

// Actualizar un propietario por ID
export const updateOwner = async (req, res, next) => {
  try {
    const ownerId = req.params.own_id;
    const response = await axios.put(`${url}/owner/${ownerId}`, req.body);
    const updatedOwnerData = response.data;
    if (updatedOwnerData === "Owner updated successfully") {
      return res.status(200).json({ message: "Propietario actualizado con éxito" });
    } else {
      return res.status(404).json({ message: "Propietario no encontrado" });
    }
  } catch (error) {
    return next(error);
  }
};

// Eliminar un propietario por ID
export const deleteOwner = async (req, res, next) => {
  try {
    const ownerId = req.params.own_id;
    const response = await axios.delete(`${url}/owner/${ownerId}`);
    if (response.data === "Owner deleted successfully") {
      return res.status(200).json({ message: "Propietario eliminado con éxito" });
    } else {
      return res.status(404).json({ message: "Propietario no encontrado" });
    }
  } catch (error) {
    return next(error);
  }
};
