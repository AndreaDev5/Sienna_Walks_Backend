import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Registro de usuarios
export const registrar = async (req, res) => {
    const { nombre, apellido, email, password, celular, direccionEnvio } = req.body;

    try {
        //Verificar que el correo no tenga otra cuenta
        const usuarioEncontrado = await User.findOne({email})
        if (usuarioEncontrado) return res.status(400).json(["El email registrado ya existe"]);
        
        // Encriptar contraseña
        const hash = await bcrypt.hash(password, 10);

        const newUsuario = new User({
            nombre,
            apellido,
            email,
            password: hash,
            celular,
            direccionEnvio
        });

        // Guardar el usuario
        const usuarioGuardado = await newUsuario.save();

        // Generar token
        const token = await new Promise((resolve, reject) => {
            jwt.sign(
                { id: usuarioGuardado._id },
                process.env.JWT_SECRET || "secret123",
                { expiresIn: "1d" },
                (err, token) => {
                    if (err) reject(err);
                    resolve(token);
                }
            );
        });

        // Configurar cookie
        res.cookie('token', token, { httpOnly: true });

        // Respuesta JSON
        res.json({
            id: usuarioGuardado._id,
            nombre: usuarioGuardado.nombre,
            email: usuarioGuardado.email,
            createdAt: usuarioGuardado.createdAt,
            updatedAt: usuarioGuardado.updatedAt
        });

        console.log("Registrado", newUsuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login de usuarios
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar usuario por email
        const usuarioEncontrado = await User.findOne({ email });
        if (!usuarioEncontrado) return res.status(400).json({ message: "Usuario no encontrado" });

        // Comparar contraseñas
        const verificacion = await bcrypt.compare(password, usuarioEncontrado.password);
        if (!verificacion) return res.status(400).json({ message: "Contraseña incorrecta" });

        // Generar token
        const token = await new Promise((resolve, reject) => {
            jwt.sign(
                { id: usuarioEncontrado._id },
                process.env.JWT_SECRET || "secret123",
                { expiresIn: "1d" },
                (err, token) => {
                    if (err) reject(err);
                    resolve(token);
                }
            );
        });

        // Configurar cookie
        res.cookie('token', token, { httpOnly: true });

        // Respuesta JSON
        res.json({
            id: usuarioEncontrado._id,
            nombre: usuarioEncontrado.nombre,
            email: usuarioEncontrado.email,
            createdAt: usuarioEncontrado.createdAt,
            updatedAt: usuarioEncontrado.updatedAt
        });

        console.log("Inicio de sesión correcto");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cerrar sesión
export const salir = (req, res) => {
    res.cookie('token', "", { expires: new Date(0), httpOnly: true });
    return res.sendStatus(200);
};

// Perfil de usuario
export const perfil = async (req, res) => {
    try {
        const usuarioEncontrado = await User.findById(req.user.id);
        if (!usuarioEncontrado) return res.status(400).json({ message: "Usuario no encontrado" });

        return res.json({
            id: usuarioEncontrado._id,
            nombre: usuarioEncontrado.nombre,
            email: usuarioEncontrado.email,
            createdAt: usuarioEncontrado.createdAt,
            updatedAt: usuarioEncontrado.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Verificación del token para rutas protegidas

export const verify = async (req,res) =>{
    const {token} = req.cookies
   
    if (!token) return res.status(401).json({message: "No autorizado"});
    jwt.verify(token, "secret123", async (err, user) => {
      if (err) return res.status(401).json({message: "No autorizado"});
   
      const usuarioEncontrado = await User.findById(user.id)
      if(!usuarioEncontrado) return res.status(401).json({message: "No autorizado"});

      return res.json({
        id: usuarioEncontrado._id,
        nombre: usuarioEncontrado.nombre,
        email: usuarioEncontrado.email,
      })
    })
}