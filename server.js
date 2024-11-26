/* ------ 📦 Dependencias Necesarias 📦 ------ */


// --> 🚀 Framework de Servidor Express 🚀 <--

import express from "express"; 
import cors from "cors";
import morgan from "morgan";
import http from "http"; 
import cookieParser from "cookie-parser";
import { config } from "dotenv"; 
import conectarDB from './src/config/siennadb.js';
import authRoutes from './src/routes/userRoutes.js'
import productRoutes from './src/routes/productRoutes.js'
// * ------ ⚙️ Configuración del Entorno ⚙️ ------ *

config(); 
const PORT = process.env.PORT || 3000; 

// * ------ 🏁 Inicialización del Servidor Express 🏁 ------ *

const app = express(); 
app.use(cors({ origin: 'http://localhost:5173',   credentials: true}));
app.use(morgan('dev'));
app.use(express.json()); 
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));


app.use("/api",authRoutes);
app.use("/crud",productRoutes);
// * ------ 🔀 Conexión a la Base de Datos 🔀 ------ *

conectarDB(); 

// * ------ 🔀 Definición de Rutas 🔀 ------ *

app.get("/", (req, res) => {
    res.send("¡Servidor en funcionamiento!"); 
});

// * ------ 🎧 Inicialización del Servidor HTTP 🎧 ------ *


const server = http.createServer(app); 

server.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT} 🚀`);
    console.log(`🌐 Accede a http://localhost:${PORT} 🌐`);
});

