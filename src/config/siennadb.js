import mongoose from 'mongoose';
import { config } from 'dotenv';

config(); 

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("🌐 Conexión a la base de datos exitosa 🌐");
    } catch (error) {
        console.error("🚨 Error de conexión a la base de datos 🚨", error);
        process.exit(1); 
    }
};

export default conectarDB;

