import { response } from "express";
import { connectDB } from "../db.js";
import axios from "axios";
const url = await connectDB();

// Obtener todas las donaciones
export const getDonations = async (req, res, next) => {
  try {
    const response = await axios.get(`${url}/donations`);
    const donations = response.data;
    return res.status(200).json(donations);
  } catch (error) {
    return next(error);
  }
};

// Obtener una donación por ID
export const getDonationById = async (req, res, next) => {
  try {
    const donationId = req.params.don_id;
    // Verificar si donationId es un número
    if (!/^\d+$/.test(donationId)) {
      return res.status(400).json({ message: "El ID de la donación debe ser un número entero válido" });
    }
    const response = await axios.get(`${url}/donations/${donationId}`);
    const donation = response.data;
    if (donation === "Donation not found") {
      return res.status(404).json({ message: "Donación no encontrada" });
    }
    return res.status(200).json(donation);
  } catch (error) {
    return next(error);
  }
};

// Crear una nueva donación
export const createDonation = async (req, res, next) => {
  try {
    const response = await axios.post(`${url}/donations`, req.body);
    return res.json("Donación creada con éxito");
  } catch (error) {
    console.error('Error al crear la donación: ', error);
    return res.status(500).json({ message: 'Error al crear la donación' });
  }
};

// Actualizar una donación por ID
export const updateDonation = async (req, res, next) => {
  try {
    const donationId = req.params.don_id;
    // Verificar si donationId es un número
    if (!/^\d+$/.test(donationId)) {
      return res.status(400).json({ message: "El ID de la donación debe ser un número entero válido" });
    }
    const response = await axios.put(`${url}/donations/${donationId}`, req.body);
    const updatedDonationData = response.data;
    if (updatedDonationData === "Invalid don_id. Please provide a valid integer ID.") {
      return res.status(400).json({ message: "ID no válido. Proporcione un ID entero válido." });
    } else if (updatedDonationData === "Donation updated successfully") {
      return res.status(200).json({ message: "Donación actualizada con éxito" });
    } else {
      return res.status(404).json({ message: "Donación no encontrada" });
    }
  } catch (error) {
    return next(error);
  }
};

// Eliminar una donación por ID
export const deleteDonation = async (req, res, next) => {
  try {
    const donationId = req.params.don_id;
    // Verificar si donationId es un número
    if (!/^\d+$/.test(donationId)) {
      return res.status(400).json({ message: "El ID de la donación debe ser un número entero válido" });
    }
    const response = await axios.delete(`${url}/donations/${donationId}`);
    if (response.data === "Invalid don_id. Please provide a valid integer ID.") {
      return res.status(400).json({ message: "ID no válido. Proporcione un ID entero válido." });
    } else if (response.data === "Donation deleted successfully") {
      return res.status(200).json({ message: "Donación eliminada con éxito" });
    } else {
      return res.status(404).json({ message: "Donación no encontrada" });
    }
  } catch (error) {
    return next(error);
  }
};
