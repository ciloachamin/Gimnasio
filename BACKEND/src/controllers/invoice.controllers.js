import { response } from "express";
import { connectDB } from "../db.js";
import axios from "axios";
const url = await connectDB();

// Obtener todas las facturas
export const getInvoices = async (req, res, next) => {
  try {
    const response = await axios.get(`${url}/invoice`);
    const invoices = response.data;
    return res.status(200).json(invoices);
  } catch (error) {
    return next(error);
  }
};

// Obtener una factura por ID
export const getInvoiceById = async (req, res, next) => {
  try {
    const invoiceId = req.params.inv_id;
    // Verificar si invoiceId es un número
    if (!/^\d+$/.test(invoiceId)) {
      return res.status(400).json({ message: "El ID de la factura debe ser un número entero válido" });
    }
    const response = await axios.get(`${url}/invoice/${invoiceId}`);
    const invoice = response.data;
    if (invoice === "Invoice not found") {
      return res.status(404).json({ message: "Factura no encontrada" });
    }
    return res.status(200).json(invoice);
  } catch (error) {
    return next(error);
  }
};

// Crear una nueva factura
export const createInvoice = async (req, res, next) => {
  try {
    const response = await axios.post(`${url}/invoice`, req.body);
    return res.json("Factura creada con éxito");
  } catch (error) {
    console.error('Error al crear la factura: ', error);
    return res.status(500).json({ message: 'Error al crear la factura' });
  }
};

// Actualizar una factura por ID
export const updateInvoice = async (req, res, next) => {
  try {
    const invoiceId = req.params.inv_id;
    // Verificar si invoiceId es un número
    if (!/^\d+$/.test(invoiceId)) {
      return res.status(400).json({ message: "El ID de la factura debe ser un número entero válido" });
    }
    const response = await axios.put(`${url}/invoice/${invoiceId}`, req.body);
    const updatedInvoiceData = response.data;
    if (updatedInvoiceData === "Invalid inv_id. Please provide a valid integer ID.") {
      return res.status(400).json({ message: "ID no válido. Proporcione un ID entero válido." });
    } else if (updatedInvoiceData === "Invoice updated successfully") {
      return res.status(200).json({ message: "Factura actualizada con éxito" });
    } else {
      return res.status(404).json({ message: "Factura no encontrada" });
    }
  } catch (error) {
    return next(error);
  }
};

// Eliminar una factura por ID
export const deleteInvoice = async (req, res, next) => {
  try {
    const invoiceId = req.params.inv_id;
    // Verificar si invoiceId es un número
    if (!/^\d+$/.test(invoiceId)) {
      return res.status(400).json({ message: "El ID de la factura debe ser un número entero válido" });
    }
    const response = await axios.delete(`${url}/invoice/${invoiceId}`);
    if (response.data === "Invalid inv_id. Please provide a valid integer ID.") {
      return res.status(400).json({ message: "ID no válido. Proporcione un ID entero válido." });
    } else if (response.data === "Invoice deleted successfully") {
      return res.status(200).json({ message: "Factura eliminada con éxito" });
    } else {
      return res.status(404).json({ message: "Factura no encontrada" });
    }
  } catch (error) {
    return next(error);
  }
};
