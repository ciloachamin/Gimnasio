import { response } from "express";
import { connectDB } from "../db.js";
import axios from "axios";
const url = await connectDB();

// Obtener todos los productos
export const getProducts = async (req, res, next) => {
  try {
    const response = await axios.get(`${url}/product`);
    const products = response.data;
    return res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
};

// Obtener un producto por ID
export const getProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    // Verificar si productId es un número
    if (!/^\d+$/.test(productId)) {
      return res.status(400).json({ message: "El ID del producto debe ser un número entero válido" });
    }
    const response = await axios.get(`${url}/product/${productId}`);
    const product = response.data;
    if (product==="Product not found") {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

// Crear un nuevo producto
export const createProduct = async (req, res, next) => {
  try {
    const response = await axios.post(`${url}/product`, req.body);
    return res.json("Producto creado con éxito");

  } catch (error) {
    console.error('Error al crear el producto: ', error);
    return res.status(500).json({ message: 'Error al crear el producto' });
  }
};

// Actualizar un producto por ID
export const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    // Verificar si productId es un número
    if (!/^\d+$/.test(productId)) {
      return res.status(400).json({ message: "El ID del producto debe ser un número entero válido" });
    }
    const response = await axios.put(`${url}/product/${productId}`, req.body);
    const updatedProductData = response.data;
    if (updatedProductData === "Invalid pro_id. Please provide a valid integer ID.") {
      return res.status(400).json({ message: "ID no válido. Proporcione un ID entero válido." });
    } else if (updatedProductData === "Product updated successfully") {
      return res.status(200).json({ message: "Producto actualizado con éxito" });
    } else {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    return next(error);
  }
};

// Eliminar un producto por ID
export const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    // Verificar si productId es un número
    if (!/^\d+$/.test(productId)) {
      return res.status(400).json({ message: "El ID del producto debe ser un número entero válido" });
    }
    const response = await axios.delete(`${url}/product/${productId}`);
    if (response.data === "Invalid pro_id. Please provide a valid integer ID.") {
      return res.status(400).json({ message: "ID no válido. Proporcione un ID entero válido." });
    } else if (response.data === "Product deleted successfully") {
      return res.status(200).json({ message: "Producto eliminado con éxito" });
    } else {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    return next(error);
  }
};
