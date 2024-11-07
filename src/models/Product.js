import mongoose from "mongoose"; 

// * ------ 📦 Definición del Esquema del Producto 📦 ------ *

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name is required"], 
    },
    description: {
        type: String,
        required: [true, "The description is required"], 
    },
    price: {
        type: Number,
        required: [true, "The price is required"], 
        min: [0, "The price cannot be negative"], 
    },
    category: {
        type: String,
        required: [true, "The category is required"], 
    },
    size: {
        type: Number,
        required: [true, "The size is required"], 
    },
    color: {
        type: String,
        required: [true, "The color is required"], 
    },
    image: {
        type: String,
        required: [true, "The image is required"], 
        /*validate: {
        validator: function(v) {
                // 🌐 Validar que la imagen sea una URL válida
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v); 
            },
            message: props => `${props.value} no es una URL válida!` 
        },*/
    },
}, { timestamps: true }); 

// * ------ 📦 Crear el Modelo de Producto 📦 ------ *

const Product = mongoose.model("Product", productSchema); 
export default Product; 
