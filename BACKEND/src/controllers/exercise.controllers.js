import { response } from "express";
import { connectDB } from "../db.js";
import axios from "axios";
const url = await connectDB();

// Obtener todos los ejercicios
export const getExercises = async (req, res, next) => {
  try {
    const response = await axios.get(`${url}/exercise`);
    const exercises = response.data;
    return res.status(200).json(exercises);
  } catch (error) {
    return next(error);
  }
};

// Obtener un ejercicio por ID
export const getExerciseById = async (req, res, next) => {
  try {
    const exerciseId = req.params.exe_id;
    // Verificar si exerciseId es un número
    if (!/^\d+$/.test(exerciseId)) {
      return res.status  (400).json({ message: "El ID del ejercicio debe ser un número entero válido" });
    }
    const response = await axios.get(`${url}/exercise/${exerciseId}`);
    const exercise = response.data;
    if (exercise === "Exercise not found") {
      return res.status(404).json({ message: "Ejercicio no encontrado" });
    }
    return res.status(200).json(exercise);
  } catch (error) {
    return next(error);
  }
};

// Crear un nuevo ejercicio
export const createExercise = async (req, res, next) => {
  try {
    const response = await axios.post(`${url}/exercise`, req.body);
    return res.json("Ejercicio creado con éxito");
  } catch (error) {
    console.error('Error al crear el ejercicio: ', error);
    return res.status(500).json({ message: 'Error al crear el ejercicio' });
  }
};

// Actualizar un ejercicio por ID
export const updateExercise = async (req, res, next) => {
  try {
    const exerciseId = req.params.exe_id;
    // Verificar si exerciseId es un número
    if (!/^\d+$/.test(exerciseId)) {
      return res.status(400).json({ message: "El ID del ejercicio debe ser un número entero válido" });
    }
    const response = await axios.put(`${url}/exercise/${exerciseId}`, req.body);
    const updatedExerciseData = response.data;
    if (updatedExerciseData === "Invalid exe_id. Please provide a valid integer ID.") {
      return res.status(400).json({ message: "ID no válido. Proporcione un ID entero válido." });
    } else if (updatedExerciseData === "Exercise updated successfully") {
      return res.status(200).json({ message: "Ejercicio actualizado con éxito" });
    } else {
      return res.status(404).json({ message: "Ejercicio no encontrado" });
    }
  } catch (error) {
    return next(error);
  }
};

// Eliminar un ejercicio por ID
export const deleteExercise = async (req, res, next) => {
  try {
    const exerciseId = req.params.exe_id;
    // Verificar si exerciseId es un número
    if (!/^\d+$/.test(exerciseId)) {
      return res.status(400).json({ message: "El ID del ejercicio debe ser un número entero válido" });
    }
    const response = await axios.delete(`${url}/exercise/${exerciseId}`);
    if (response.data === "Invalid exe_id. Please provide a valid integer ID.") {
      return res.status(400).json({ message: "ID no válido. Proporcione un ID entero válido." });
    } else if (response.data === "Exercise deleted successfully") {
      return res.status(200).json({ message: "Ejercicio eliminado con éxito" });
    } else {
      return res.status(404).json({ message: "Ejercicio no encontrado" });
    }
  } catch (error) {
    return next(error);
  }
};
