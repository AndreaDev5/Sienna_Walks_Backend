import { Router } from 'express';
import { registrar, login, salir, perfil } from "../controllers/userController.js";
import { autentificacionRequerida } from "../middlewares/authMiddleware.js";
import { validacionEsquemas } from "../utils/validation.js";
import { esquemaLogin, esquemaRegistro } from "../utils/validationauth.js";

const router = Router();

// Rutas de autenticación
router.post('/registrar', validacionEsquemas(esquemaRegistro), registrar);
router.post('/login', validacionEsquemas(esquemaLogin), login);
router.post('/logout', salir);
router.get('/perfil', autentificacionRequerida, perfil);

export default router;
