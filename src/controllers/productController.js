import Product from "../models/Product.js";
import * as fs from 'fs' //Para eliminar las imagenes 


//Obtener productos
export const getProduct = async (req, res) => {
  try {
    //Almacena los id
    const {id} = req.params
    //Busca los productos de acuerdo al id y da una respuesta
    const productos = (id === undefined) ? await Product.find() : await Product.findById(id)
    return res.status(200).json({status:true, data: productos})
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Crear productos 
export const createProduct = async (req, res) => {
  try {
    // Crear una nueva instancia para crear un nuevo producto
    const newProduct = new Product({
        nombre: req.body.nombre, 
        descripcion : req.body.descripcion,  
        precio: req.body.precio, 
        categoria: req.body.categoria, 
        talla: req.body.talla, 
        color: req.body.color, 
        imagen: req.file.filename,
      user: req.user.id,
    });
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Eliminar producto
export const deleteProducto = async (req, res) => {
  try {
    //Toma el id 
    const {id} = req.params
    //Busca el id, usa la función y elimina el producto
    await  Product.findByIdAndDelete(req.params.id)
    await eliminarimagen(id)
    return res.status(200).json({message : "Producto eliminado"})

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Actualizar producto
export const updateProducto = async (req, res) => {
 
  const {id} = req.params
  const datosactualizar = ({
    nombre: req.body.nombre, 
    descripcion : req.body.descripcion,  
    precio: req.body.precio, 
    categoria: req.body.categoria, 
    talla: req.body.talla, 
    color: req.body.color, 
    imagen: req.file ? req.file.filename : undefined
  })
  try {
    const actualizarproducto = await Product.findByIdAndUpdate(id, datosactualizar, { new: true });
    if (!actualizarproducto  ) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

     res.json(actualizarproducto );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Función para eliminar las imagenes de la carpeta 
const eliminarimagen = async(id) =>{
  const eliminar = await Product.findById(id)
  const img =eliminar.imagen
  fs.unlinkSync('./uploads/'+img)
  }