/* ------ 📦 Modelo de Pedido 📦 ------ */

// --> 🧩 Dependencias Necesarias 🧩 <--

import mongoose from 'mongoose';

// * ------ 📝 Definición del Esquema de Pedido 📝 ------ *

const orderSchema = new mongoose.Schema(
{
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "El usuario es requerido"],
    },
    productos: [
    {
        producto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, "El producto es requerido"],
        },
        cantidad: {
            type: Number,
            required: [true, "La cantidad es requerida"],
        },
        tallaSeleccionada: {
            type: String, 
            required: [true, "La talla seleccionada es requerida"],
        },
        colorSeleccionado: {
            type: String, 
            required: [true, "El color seleccionado es requerido"],
        },
    },
    ],
    total: {
        type: Number,
        required: [true, "El total del pedido es requerido"],
    },
    estado: {
    type: String,
        enum: ['pendiente', 'enviado', 'entregado', 'cancelado'],
        default: 'pendiente',
    },
    direccionEnvio: {
        type: String,
        required: [true, "La dirección de envío es requerida"],
    },
},
{ timestamps: true }
);

// * ------ 💾 Creación del Modelo de Pedido 💾 ------ *

const Order = mongoose.model('Order', orderSchema);

export default Order;
