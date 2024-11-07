import { z } from 'zod'; // 📦 Importar Zod para la validación de esquemas


// * ------ 📋 Esquema de Registro de Productos 📋 ------ *

export const schemaProduct = z.object({
    name: z.string({ 
        required_error: "The name is required" 
    }),
    description: z.string({ 
        required_error: "The description is required" 
    }),
    price: z.string({ 
        required_error: "The price is required" 
    }),
    category: z.string({ 
        required_error: "The category is required" 
    }),
    size: z.string({ 
        required_error: "The size is required" 
    }),
    color: z.string({ 
        required_error: "The color is required" 
    }),
});

