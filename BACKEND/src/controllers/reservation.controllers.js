import { response } from "express";
import { connectDB } from "../db.js";
import axios from "axios";
const url = await connectDB();

// Obtener todas las reservas
export const getReservations = async (req, res, next) => {
  try {
    const response = await axios.get(`${url}/reservation`);
    const reservations = response.data;
    return res.status(200).json(reservations);
  } catch (error) {
    return next(error);
  }
};

// Obtener una reserva por ID
export const getReservationById = async (req, res, next) => {
  try {
    const reservationId = req.params.res_id;
    const response = await axios.get(`${url}/reservation/${reservationId}`);
    const reservation = response.data;
    if (reservation === "Reservation not found") {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
    return res.status(200).json(reservation);
  } catch (error) {
    return next(error);
  }
};

// Crear una nueva reserva
export const createReservation = async (req, res, next) => {
  try {
    const response = await axios.post(`${url}/reservation`, req.body);
    return res.json("Reserva creada con éxito");
  } catch (error) {
    console.error('Error al crear la reserva: ', error);
    return res.status(500).json({ message: 'Error al crear la reserva' });
  }
};

// Actualizar una reserva por ID
export const updateReservation = async (req, res, next) => {
  try {
    const reservationId = req.params.res_id;
    const response = await axios.put(`${url}/reservation/${reservationId}`, req.body);
    const updatedReservationData = response.data;
    if (updatedReservationData === "Reservation updated successfully") {
      return res.status(200).json({ message: "Reserva actualizada con éxito" });
    } else {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
  } catch (error) {
    return next(error);
  }
};

// Eliminar una reserva por ID
export const deleteReservation = async (req, res, next) => {
  try {
    const reservationId = req.params.res_id;
    const response = await axios.delete(`${url}/reservation/${reservationId}`);
    if (response.data === "Reservation deleted successfully") {
      return res.status(200).json({ message: "Reserva eliminada con éxito" });
    } else {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
  } catch (error) {
    return next(error);
  }
};
