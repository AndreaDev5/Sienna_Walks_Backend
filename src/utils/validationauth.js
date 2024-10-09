import { z } from 'zod'; // 📦 Importar Zod para la validación de esquemas


// * ------ 📋 Esquema de Registro de Usuario 📋 ------ *

export const esquemaRegistro = z.object({
    nombre: z.string({ 
        required_error: "Nombre requerido" 
    }),
    apellido: z.string({ 
        required_error: "Apellido requerido" 
    }),
    email: z.string({ 
        required_error: "Correo requerido" 
    }).email({ 
        message: "Correo inválido", 
    }),
    password: z.string({ 
        required_error: "Contraseña requerida" 
    }).min(6, { 
        message: "Contraseña debe ser mayor a 6 caracteres" 
    }),
    celular: z.string({ 
        required_error: "Celular requerido" 
    }),
});

// * ------ 📋 Esquema de Inicio de Sesión de Usuario 📋 ------ *

export const esquemaLogin = z.object({
    email: z.string({ 
        required_error: "Correo requerido" 
    }).email({ 
        message: "Correo inválido", 
    }),
    password: z.string({ 
        required_error: "Contraseña requerida" 
    }).min(6, { 
        message: "Contraseña debe ser mayor a 6 caracteres" 
    }),
});
