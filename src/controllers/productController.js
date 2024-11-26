import Product from "../models/Product.js";
import fs from "fs/promises";

// Obtener todos los productos o un producto por ID (dependiendo de si se pasa el ID)
export const getProducts = async (req, res) => {
  const { size } = req.query; 
  
  try {
    if (req.params.id) {
      return getProductById(req, res); 
    }

    const query = size ? { size } : {}; // Si se pasa una talla, se filtra por ella
    const products = await Product.find(query);
    return res.status(200).json({ status: true, data: products });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Obtener un producto específico por ID
export const getProductById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ status: false, message: "Product not found" });
    }
    return res.status(200).json({ status: true, data: product });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
  const { name, description, price, category, size, color } = req.body;
  const image = req.file ? req.file.path : null; // Ruta de la imagen (si existe)

  try {
    const newProduct = new Product({ name, description, price, category, size, color, image });
    await newProduct.save();
    return res.status(201).json({ status: true, data: newProduct });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Eliminar un producto por ID
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ status: false, message: "Product not found" });
    }

    // Eliminar la imagen asociada al producto si existe
    if (product.image) {
      await fs.unlink(product.image);
    }

    return res.status(200).json({ status: true, message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Actualizar un producto por ID
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, size, color } = req.body;
  const image = req.file ? req.file.path : undefined;

  try {
    const updatedData = { name, description, price, category, size, color };
    if (image) updatedData.image = image;

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ status: false, message: "Product not found" });
    }

    return res.status(200).json({ status: true, data: updatedProduct });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
