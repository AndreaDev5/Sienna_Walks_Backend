import { z } from 'zod'; // 📦 Importar Zod para la validación de esquemas


// * ------ 📋 Esquema de Registro de Productos 📋 ------ *

export const esquemaProducto = z.object({
    nombre: z.string({ 
        required_error: "Nombre requerido" 
    }),
    descripcion: z.string({ 
        required_error: "Descripción requerida" 
    }),
    precio: z.string({ 
        required_error: "Precio requerido" 
    }),
    categoria: z.string({ 
        required_error: "Categoria requerida" 
    }),
    talla: z.string({ 
        required_error: "Talla requerida" 
    }),
    color: z.string({ 
        required_error: "Color requerido" 
    }),
});

