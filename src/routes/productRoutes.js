import { Router } from 'express';
import {
    updateProduct,
    createProduct,
    getProducts,
    deleteProduct,
    getProductById
} from "../controllers/productController.js";


import { validationSchemas } from "../middlewares/validation.Middlewars.js";  
import { schemaProduct } from "../utils/validationproduct.js";  
import { authRequired } from "../middlewares/authMiddleware.js"; 
import { upload } from "../middlewares/multerMiddlewares.js";  

const router = Router();

/* -------------------- Rutas para Productos -------------------- */

// Obtener todos los productos
router.get("/", getProducts);

// Obtener un producto específico por ID
router.get("/:id", getProductById);

// Crear un producto nuevo
router.post(
    "/", 
    authRequired, 
    upload.single("imagen"),  
    validationSchemas(schemaProduct),  
    createProduct  
);

// Actualizar un producto por ID
router.put(
    "/:id", 
    authRequired,  
    upload.single("imagen"),  
    validationSchemas(schemaProduct), 
    updateProduct  
);

// Eliminar un producto por ID
router.delete("/:id", authRequired, deleteProduct);

export default router;
