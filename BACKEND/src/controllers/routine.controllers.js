import { response } from "express";
import { connectDB } from "../db.js";
import axios from "axios";
const url = await connectDB();

// Obtener todas las rutinas
export const getRoutines = async (req, res, next) => {
  try {
    const response = await axios.get(`${url}/routine`);
    const routines = response.data;
    return res.status(200).json(routines);
  } catch (error) {
    return next(error);
  }
};

// Obtener una rutina por ID
export const getRoutineById = async (req, res, next) => {
  try {
    const routineId = req.params.rou_id;
    const response = await axios.get(`${url}/routine/${routineId}`);
    const routine = response.data;
    if (routine === "Routine not found") {
      return res.status(404).json({ message: "Rutina no encontrada" });
    }
    return res.status(200).json(routine);
  } catch (error) {
    return next(error);
  }
};

// Crear una nueva rutina
export const createRoutine = async (req, res, next) => {
  try {
    const response = await axios.post(`${url}/routine`, req.body);
    return res.json("Rutina creada con éxito");
  } catch (error) {
    console.error('Error al crear la rutina: ', error);
    return res.status(500).json({ message: 'Error al crear la rutina' });
  }
};

// Actualizar una rutina por ID
export const updateRoutine = async (req, res, next) => {
  try {
    const routineId = req.params.rou_id;
    const response = await axios.put(`${url}/routine/${routineId}`, req.body);
    const updatedRoutineData = response.data;
    if (updatedRoutineData === "Routine updated successfully") {
      return res.status(200).json({ message: "Rutina actualizada con éxito" });
    } else {
      return res.status(404).json({ message: "Rutina no encontrada" });
    }
  } catch (error) {
    return next(error);
  }
};

// Eliminar una rutina por ID
export const deleteRoutine = async (req, res, next) => {
  try {
    const routineId = req.params.rou_id;
    const response = await axios.delete(`${url}/routine/${routineId}`);
    if (response.data === "Routine deleted successfully") {
      return res.status(200).json({ message: "Rutina eliminada con éxito" });
    } else {
      return res.status(404).json({ message: "Rutina no encontrada" });
    }
  } catch (error) {
    return next(error);
  }
};
