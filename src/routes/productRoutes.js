import { Router } from 'express';
import {
    createProduct,
    deleteProducto,
    getProduct,
    updateProducto,
  } from "../controllers/productController.js";
  import {validacionEsquemas} from "../middlewares/validation.Middlewars.js"
import { esquemaProducto } from '../utils/validationproduct.js';
import {autentificacionRequerida} from '../middlewares/authMiddleware.js'
import { upload } from '../middlewares/multerMiddlewares.js';


const router = Router();
//Rutas para el crud de los productos
router.get("/productos", autentificacionRequerida, getProduct);

router.post("/productos", autentificacionRequerida, upload.single('imagen'), validacionEsquemas(esquemaProducto), createProduct);

router.get("/productos/:id", autentificacionRequerida, getProduct);

router.put("/productos/:id", autentificacionRequerida,upload.single('imagen'), updateProducto);

router.delete("/productos/:id", autentificacionRequerida, deleteProducto);


export default router;

