import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Registro de usuarios
export const registerUsers = async (req, res) => {
    const { name, lastname, email, password, cellphone, city, address } = req.body;

    try {
        //Verificar que el correo no tenga otra cuenta
        const userFound = await User.findOne({email})
        if (userFound) return res.status(400).json(["The registered email already exists"]);
        
        // Encriptar contraseña
        const hash = await bcrypt.hash(password, 10);

        // Verificamos si existe la URL y guardamos la URL de la imagen 
        let imageUrl = '';
        if (req.file) {
          imageUrl = `/uploads/${req.file.filename}`; 
        }
    
        const newUsuario = new User({
            name,
            lastname,
            email,
            password: hash,
            cellphone,
            city,
            address,
            image: imageUrl 
        });

        // Guardar el usuario
        const userSaved = await newUsuario.save();

        // Respuesta JSON
        res.json({
            id: userSaved._id,
            name: userSaved.name,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });

        console.log("Register", newUsuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Obtención de usuarios
export const getUsers = async (req, res) => {
    try {
      //Almacena los id
      const {id} = req.params
      //Busca los usuarios de acuerdo al id y da una respuesta
      const users = (id === undefined) ? await User.find() : await User.findById(id)
      return res.status(200).json({status:true, data: users})
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

//Actualizar usuarios
export const updateUsers = async (req, res) => {
 
    const {id} = req.params
    //Se obtienen los datos de acuerdo al id
    const updatedata = ({
      name: req.body.name, 
      lastname : req.body.lastname,  
      email: req.body.email, 
      password: req.body.password, 
      cellphone: req.body.cellphone, 
      city: req.body.city,
      address: req.body.address,
      image: req.file ? req.file.filename : undefined
    })
    try {
        //Busca nuevamente el id y pasa los datos para actualizarlos
      const updateusers = await User.findByIdAndUpdate(id, updatedata, { new: true });
      if (!updateusers  ) {
          return res.status(404).json({ message: 'User not found' });
      }
  
       res.json(updateusers );
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  


// Login de usuarios
export const loginUsers = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar usuario por email
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: "User not found" });

        // Comparar contraseñas
        const verification = await bcrypt.compare(password, userFound.password);
        if (!verification) return res.status(400).json({ message: "Wrong password" });

        // Generar token
        const token = await new Promise((resolve, reject) => {
            jwt.sign(
                { id: userFound._id },
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
            token: token,
            id: userFound._id,
            name: userFound.name,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });

        console.log("Successful login");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cerrar sesión
export const logoutUsers = (req, res) => {
    res.cookie('token', "", { expires: new Date(0), httpOnly: true });
    return res.sendStatus(200);
};

// Perfil de usuario
export const profileUsers = async (req, res) => {
    try {
        const userFound = await User.findById(req.user.id);
        if (!userFound) return res.status(400).json({ message: "User not found" });

        return res.json({
            id: userFound._id,
            name: userFound.name,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Verificación del token para rutas protegidas

export const verifyUsers = async (req,res) =>{
    const {token} = req.cookies
   
    if (!token) return res.status(401).json({message: "unauthorized"});
    jwt.verify(token, "secret123", async (err, user) => {
      if (err) return res.status(401).json({message: "unauthorized"});
   
      const userFound = await User.findById(user.id)
      if(!userFound) return res.status(401).json({message: "unauthorized"});

      return res.json({
        id: userFound._id,
        name: userFound.name,
        email: userFound.email,
      })
    })
}