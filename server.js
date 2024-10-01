// * ------ 📦 Dependencias Necesarias 📦 ------ *

// --> 🚀 Framework de Servidor Express 🚀 <--

import express from "express"; // Para crear el servidor
import cors from "cors"; // Para habilitar políticas de acceso entre dominios
import http from "http"; // Para manejar las funcionalidades HTTP
import createError from "http-errors"; // Para manejar errores HTTP personalizados
import { config } from "dotenv"; // Para manejar variables de entorno

// --> 🛠️ Middlewares y Utilidades 🛠️ <--
import cookieParser from "cookie-parser"; // Para manejar cookies en el servidor

// --> ♾️ Importación de Rutas ♾️ <--
import productRouter from "./src/routers/productRouter.js"; // Rutas de productos
import userRouter from "./src/routers/userRouter.js"; // Rutas de usuarios
import authRouter from "./src/routers/authRouter.js"; // Rutas de autenticación

// * ------ ⚙️ Configuración del Entorno ⚙️ ------ *

config(); // Cargar las variables de entorno desde .env

const PORT = process.env.PORT || 3000; // Puerto definido en las variables de entorno o por defecto el 3000

// * ------ 🏁 Inicialización del Servidor Express 🏁 ------ *

const app = express(); // Inicializar la aplicación de Express

// --> 🔌 Middlewares Globales 🔌 <--

app.use(cors()); // Habilitar CORS para todas las rutas
app.use(express.json()); // Permitir recibir datos en formato JSON
app.use(express.urlencoded({ extended: true })); // Permitir recibir datos en formularios
app.use(cookieParser()); // Habilitar el manejo de cookies

// * ------ 🔀 Definición de Rutas 🔀 ------ *

// --> 🛒 Rutas de Productos
app.use("/api/products", productRouter);

// --> 👥 Rutas de Usuarios
app.use("/api/users", userRouter);

// --> 🔐 Rutas de Autenticación
app.use("/api/auth", authRouter);

// * ------ 🚫 Rutas No Encontradas 🚫 ------ *

app.use((req, res, next) => {
    res.status(404).json({
        status: "error",
        message: `🚧 Ruta ${req.originalUrl} no encontrada 🚧`,
        method: req.method,
    });
    next(createError(404, "Ruta no implementada")); // Crear un error 404 personalizado
});

// * ------ ❌ Manejador de Errores ❌ ------ *

app.use((err, req, res, next) => {
    console.error(`❗ Error: ${err.message}`); // Loggear el error en la consola
    res.status(err.status || 500).json({
        status: "error",
        message: "💥 Algo salió mal en el servidor",
    });
});

// * ------ 🎧 Inicialización del Servidor HTTP 🎧 ------ *

const server = http.createServer(app); // Crear servidor HTTP con Express

server.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT} 🚀`);
    console.log(`🌐 Accede a http://localhost:${PORT} 🌐`);
});

// * ------ 🛠️ Manejo de Errores del Servidor 🛠️ ------ *

server.on("error", (error) => {
    if (error.syscall !== "listen") throw error;

    const bind = typeof PORT === "string" ? `Pipe ${PORT}` : `Port ${PORT}`;

    switch (error.code) {
        case "EACCES":
            console.error(`❌ ${bind} requiere permisos elevados ❌`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`❌ ${bind} ya está en uso ❌`);
            process.exit(1);
            break;
        default:
            throw error;
    }
});
