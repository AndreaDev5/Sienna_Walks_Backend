// * ------ ✅ Función de Validación de Esquemas ✅ ------ *

export const validacionEsquemas = (esquema) => (req, res, next) => {
    try {
        esquema.parse(req.body); 
        next(); 
    } catch (error) {
        
        return res.status(400).json({ 
            message: error.errors.map((error) => error.message) 
        });
    }
};
