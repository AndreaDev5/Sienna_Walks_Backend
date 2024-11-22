import { z } from 'zod'; // 📦 Importar Zod para la validación de esquemas


// * ------ 📋 Esquema de Registro de Usuario 📋 ------ *

export const schemaRegistry = z.object({
    name: z.string({ 
        required_error: "The name is required" 
    }),
    lastname: z.string({ 
        required_error: "The lastname is required" 
    }),
    email: z.string({ 
        required_error: "The email is required" 
    }).email({ 
        message: "Invalid email", 
    }),
    password: z.string({ 
        required_error: "The password is required" 
    }).min(6, { 
        message: "Password must be greater than 6 characters" 
    }),
    cellphone: z.string({ 
        required_error: "The cellphone is required" 
    }),
    city: z.string({ 
        required_error: "The city is required" 
    }),
    address: z.string({ 
        required_error: "The address is required" 
    }),
});

// * ------ 📋 Esquema de Inicio de Sesión de Usuario 📋 ------ *

export const schemaLogin = z.object({
    email: z.string({ 
        required_error: "The email is required" 
    }).email({ 
        message: "Invalid email", 
    }),
    password: z.string({ 
        required_error: "The password is required" 
    }).min(6, { 
        message: "Password must be greater than 6 characters" 
    }),
});
