import mongoose from "mongoose"; 

// * ------ 📦 Definición del Esquema del Producto 📦 ------ *

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es requerido"], 
    },
    descripcion: {
        type: String,
        required: [true, "La descripción es requerida"], 
    },
    precio: {
        type: Number,
        required: [true, "El precio es requerido"], 
        min: [0, "El precio no puede ser negativo"], 
    },
    categoria: {
        type: String,
        required: [true, "La categoría es requerida"], 
    },
    talla: {
        type: String,
        required: [true, "La talla es requerida"], 
    },
    color: {
        type: String,
        required: [true, "El color es requerido"], 
    },
    direccion: {
        type: String,
        required: [true, "La dirección es requerida"],
    },
    imagen: {
        type: String,
        required: [true, "La imagen es requerida"], 
        validate: {
        validator: function(v) {
                // 🌐 Validar que la imagen sea una URL válida
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v); 
            },
            message: props => `${props.value} no es una URL válida!` 
        },
    },
}, { timestamps: true }); 

// * ------ 📦 Crear el Modelo de Producto 📦 ------ *

const Product = mongoose.model("Product", productSchema); 
export default Product; 
