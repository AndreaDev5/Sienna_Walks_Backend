import { Router } from 'express'; 

const router = Router(); 

// * ------ 🔐 Ruta de Login 🔐 ------ *

router.post('/login', (req, res) => {
    res.json({ message: 'Autenticación exitosa' });
});

// * ------ 📤 Exportar el Router 📤 ------ *

export default router; 
