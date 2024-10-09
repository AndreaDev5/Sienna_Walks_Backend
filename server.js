/* ------ 📦 Dependencias Necesarias 📦 ------ */

// --> 🚀 Framework de Servidor Express 🚀 <--

import express from "express"; 
import cors from "cors";
import http from "http"; 
import { config } from "dotenv"; 
import conectarDB from './src/config/siennadb.js';

// * ------ ⚙️ Configuración del Entorno ⚙️ ------ *

config(); 
const PORT = process.env.PORT || 3000; 

// * ------ 🏁 Inicialización del Servidor Express 🏁 ------ *

const app = express(); 
app.use(cors()); 
app.use(express.json()); 

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
