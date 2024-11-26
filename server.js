/* ------ 📦 Dependencias Necesarias 📦 ------ */

// --> 🚀 Framework de Servidor Express 🚀 <--
import express from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import cookieParser from "cookie-parser";
import { config } from "dotenv"; 
import conectarDB from './src/config/siennadb.js'; 
import authRoutes from './src/routes/userRoutes.js'; 
import productRoutes from './src/routes/productRoutes.js';

// * ------ ⚙️ Configuración del Entorno ⚙️ ------ *
config(); 
const PORT = process.env.PORT || 3000; // Puerto de la API

// * ------ 🏁 Inicialización del Servidor Express 🏁 ------ *
const app = express();

// Middlewares
app.use(cors()); 
app.use(morgan('dev')); 
app.use(express.json()); 
app.use(cookieParser()); 
app.use('/uploads', express.static('uploads')); 

// Rutas
app.use("/api", authRoutes); 
app.use("/api/products", productRoutes); 

// * ------ 🔀 Conexión a la Base de Datos 🔀 ------ *
conectarDB();

// * ------ 🔀 Manejo de Errores Globales 🔀 ------ *
app.use((err, req, res, next) => {
console.error(err); 
res.status(500).json({ message: "Error interno del servidor" }); 
});

// * ------ 🎧 Inicialización del Servidor HTTP 🎧 ------ *
const server = http.createServer(app);

server.listen(PORT, () => {
console.log(`🚀 Servidor corriendo en el puerto ${PORT} 🚀`);
console.log(`🌐 Accede a http://localhost:${PORT} 🌐`);
});
