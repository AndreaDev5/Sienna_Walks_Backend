import { Router } from 'express';
import { registerUsers,updateUsers,getUsers, profileUsers, loginUsers, logoutUsers } from "../controllers/userController.js";
import { authRequired } from "../middlewares/authMiddleware.js";
import {validationSchemas} from "../middlewares/validation.Middlewars.js"
import { schemaLogin, schemaRegistry} from "../utils/validationauth.js";
import { upload } from '../middlewares/multerMiddlewares.js';

const router = Router();

// Rutas de autenticación
router.post('/register',upload.single('imagen'),  validationSchemas(schemaRegistry), registerUsers);
router.post('/login', validationSchemas(schemaLogin), loginUsers);
router.post('/logout', logoutUsers);
router.get('/profile', authRequired, profileUsers);
router.post('/profile', authRequired, profileUsers)
router.get('/users',  getUsers );
router.get('/users/:id',  getUsers );
router.put('/profile/:id',upload.single('imagen'), updateUsers );
export default router;
