import jwt from "jsonwebtoken"; 


export const autentificacionRequerida = (req, res, next) => {
    // Extrae el token de las cookies de la solicitud.
    const { token } = req.cookies;

    
    if (!token) {
        return res.status(401).json({ message: "No token, autorización denegada" });
        
    }
    // Verifica el token usando la clave secreta definida en las variables de entorno.
    jwt.verify(token, process.env.JWT_SECRET || "secret123", (err, decoded) => {
        
        if (err) {
            return res.status(403).json({ message: "Token inválido" });
            
        }
        
        req.user = decoded;
        next();
    });
};
