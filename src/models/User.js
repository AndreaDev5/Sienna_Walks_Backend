/* ------ 👤 Modelo de Usuario 👤 ------ */

// --> 🧩 Dependencias Necesarias 🧩 <--
import mongoose from 'mongoose';

// * ------ 📝 Definición del Esquema de Usuario 📝 ------ *

const userSchema = new mongoose.Schema(
{
    nombre: {
        type: String,
        required: [true, "El nombre es requerido"],
    },
    apellido: {
        type: String,
        required: [true, "El apellido es requerido"],
    },
    email: {
        type: String,
        required: [true, "El correo electrónico es requerido"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "La contraseña es requerida"],
    },
    celular: {
        type: String,
        required: [true, "El número de celular es requerido"],
    },
    direccionEnvio: {
        type: String, 
    },
    rol: {
        type: String,
        enum: ["usuario", "admin"],
        default: "usuario", 
    },
},
{ timestamps: true }
);

// * ------ 💾 Creación del Modelo de Usuario 💾 ------ *

const User = mongoose.model('User', userSchema);

export default User;
