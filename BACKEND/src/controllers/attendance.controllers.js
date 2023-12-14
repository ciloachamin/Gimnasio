import { response } from "express";
import { connectDB } from "../db.js";
import axios from "axios";
const url = await connectDB();

// Obtener todos los registros de asistencia
export const getAttendance = async (req, res, next) => {
  try {
    const response = await axios.get(`${url}/attendance`);
    const attendance = response.data;
    return res.status(200).json(attendance);
  } catch (error) {
    return next(error);
  }
};

// Obtener un registro de asistencia por ID
export const getAttendanceById = async (req, res, next) => {
  try {
    const attendanceId = req.params.att_id;
    // Verificar si attendanceId es un número
    if (!/^\d+$/.test(attendanceId)) {
      return res.status(400).json({ message: "El ID de asistencia debe ser un número entero válido" });
    }
    const response = await axios.get(`${url}/attendance/${attendanceId}`);
    const attendance = response.data;
    if (attendance === "Attendance not found") {
      return res.status(404).json({ message: "Registro de asistencia no encontrado" });
    }
    return res.status(200).json(attendance);
  } catch (error) {
    return next(error);
  }
};

// Crear un nuevo registro de asistencia
export const createAttendance = async (req, res, next) => {

  console.log("AAAAAAAAAAAAAAAAAAAAAAA");  
  console.log(req.body);

  try {
    const response = await axios.post(`${url}/attendance`, req.body);
    return res.json("Registro de asistencia creado con éxito");
  } catch (error) {
    console.error('Error al crear el registro de asistencia: ', error);
    return res.status(500).json({ message: 'Error al crear el registro de asistencia' });
  }
};

// Actualizar un registro de asistencia por ID
export const updateAttendance = async (req, res, next) => {
  try {
    const attendanceId = req.params.att_id;
    // Verificar si attendanceId es un número
    if (!/^\d+$/.test(attendanceId)) {
      return res.status(400).json({ message: "El ID de asistencia debe ser un número entero válido" });
    }
    const response = await axios.put(`${url}/attendance/${attendanceId}`, req.body);
    const updatedAttendanceData = response.data;
    if (updatedAttendanceData === "Invalid att_id. Please provide a valid integer ID.") {
      return res.status(400).json({ message: "ID no válido. Proporcione un ID entero válido." });
    } else if (updatedAttendanceData === "Attendance updated successfully") {
      return res.status(200).json({ message: "Registro de asistencia actualizado con éxito" });
    } else {
      return res.status(404).json({ message: "Registro de asistencia no encontrado" });
    }
  } catch (error) {
    return next(error);
  }
};

// Eliminar un registro de asistencia por ID
export const deleteAttendance = async (req, res, next) => {
  try {
    const attendanceId = req.params.att_id;
    // Verificar si attendanceId es un número
    if (!/^\d+$/.test(attendanceId)) {
      return res.status(400).json({ message: "El ID de asistencia debe ser un número entero válido" });
    }
    const response = await axios.delete(`${url}/attendance/${attendanceId}`);
    if (response.data === "Invalid att_id. Please provide a valid integer ID.") {
      return res.status(400).json({ message: "ID no válido. Proporcione un ID entero válido." });
    } else if (response.data === "Attendance deleted successfully") {
      return res.status(200).json({ message: "Registro de asistencia eliminado con éxito" });
    } else {
      return res.status(404).json({ message: "Registro de asistencia no encontrado" });
    }
  } catch (error) {
    return next(error);
  }
};
