/* ------ 📦 Dependencias Necesarias 📦 ------ */

// --> 🚀 Framework de Servidor Express 🚀 <--
import express from "express"; // Framework de servidor
import cors from "cors"; // Middleware para habilitar CORS
import http from "http"; // Para manejar las funcionalidades HTTP
import { config } from "dotenv"; // Para manejar variables de entorno

// * ------ ⚙️ Configuración del Entorno ⚙️ ------ *
config(); // Cargar variables de entorno
const PORT = process.env.PORT || 3000; // Puerto del servidor

// * ------ 🏁 Inicialización del Servidor Express 🏁 ------ *
const app = express(); // Crear instancia de Express
app.use(cors()); // Habilitar CORS
app.use(express.json()); // Permitir recibir datos en formato JSON

// * ------ 🔀 Definición de Rutas 🔀 ------ *
app.get("/", (req, res) => {
    res.send("¡Servidor en funcionamiento!"); // Respuesta básica
});

// * ------ 🎧 Inicialización del Servidor HTTP 🎧 ------ *
const server = http.createServer(app); // Crear servidor HTTP

server.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT} 🚀`);
    console.log(`🌐 Accede a http://localhost:${PORT} 🌐`);
});
