import { Router } from 'express';
import {
    updateProduct,
    createProduct,
    getProduct,
    deleteProduct
  } from "../controllers/productController.js";
  import {validationSchemas} from "../middlewares/validation.Middlewars.js"
import { schemaProduct } from '../utils/validationproduct.js';
import {authRequired} from '../middlewares/authMiddleware.js'
import { upload } from '../middlewares/multerMiddlewares.js';


const router = Router();
//Rutas para el crud de los productos
router.get("/products", authRequired, getProduct);

router.post("/products", authRequired, upload.single('imagen'), validationSchemas(schemaProduct), createProduct);

router.get("/products/:id", authRequired, getProduct);

router.put("/products/:id", authRequired,upload.single('imagen'), updateProduct);

router.delete("/products/:id", authRequired, deleteProduct);


export default router;

