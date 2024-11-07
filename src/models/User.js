/* ------ 👤 Modelo de Usuario 👤 ------ */

// --> 🧩 Dependencias Necesarias 🧩 <--
import mongoose from 'mongoose';

// * ------ 📝 Definición del Esquema de Usuario 📝 ------ *

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: [true, "The name is required"],
    },
    lastname: {
        type: String,
        required: [true, "The lastname is required"],
    },
    email: {
        type: String,
        required: [true, "The email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "The password is required"],
    },
    cellphone: {
        type: String,
        required: [true, "The cellphone is required"],
    },
    address: {
        type: String, 
        required: [true, "The address is required"],
    },
    image: {
        type: String

       // validate: {
       // validator: function(v) {
                // 🌐 Validar que la imagen sea una URL válida
        //        return /^(ftp|http|https):\/\/[^ "]+$/.test(v); 
        //    },
        //    message: props => `${props.value} no es una URL válida!` 
       // },
    }
},
{ timestamps: true }
);

// * ------ 💾 Creación del Modelo de Usuario 💾 ------ *

const User = mongoose.model('User', userSchema);

export default User;
