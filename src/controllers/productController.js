import Product from "../models/Product.js";
import * as fs from 'fs' //Para eliminar las imagenes 


//Obtener productos
export const getProduct = async (req, res) => {
  const {size} = req.query;
  try {
    //Almacena los id
    const {id} = req.params
    //Busca los productos de acuerdo al id y da una respuesta
    if (id) {
    const product = (id === undefined) ? await Product.find() : await Product.findById(id)
    if (!product) {
      return res.status(404).json({ status: false, message: 'Product not found' });
  }
    return res.status(200).json({status:true, data: product})
}

 // Filtrar por talla
 const query = {};
 if (size) {
     query.size = size; // Agregar el filtro de talla
 }
 // Buscar en la base de datos con el filtro
 const products = await Product.find(query);
 return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Crear productos 
export const createProduct = async (req, res) => {
  try {
    // Crear una nueva instancia para crear un nuevo producto
    const newProduct = new Product({
        name: req.body.name, 
        description : req.body.description,  
        price: req.body.price, 
        category: req.body.category, 
        size: req.body.size, 
        color: req.body.color, 
        image: req.file.filename,
      user: req.user.id,
    });
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Eliminar producto
export const deleteProduct = async (req, res) => {
  try {
    //Toma el id 
    const {id} = req.params
    //Busca el id, usa la función y elimina el producto
    await  Product.findByIdAndDelete(req.params.id)
    await deleteImage(id)
    return res.status(200).json({message : "Delete product"})

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Actualizar producto
export const updateProduct = async (req, res) => {
 
  const {id} = req.params
  const updatedata = ({
    name: req.body.name, 
    description : req.body.description,  
    price: req.body.price, 
    category: req.body.category, 
    size: req.body.size, 
    color: req.body.color, 
    image: req.file ? req.file.filename : undefined
  })
  try {
    const updateProduct = await Product.findByIdAndUpdate(id, updatedata, { new: true });
    if (!updateProduct  ) {
        return res.status(404).json({ message: 'Product not found' });
    }

     res.json(updateProduct );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Función para eliminar las imagenes de la carpeta 
const deleteImage = async(id) =>{
  const deletei = await Product.findById(id)
  const img =deletei.imagen
  fs.unlinkSync('./uploads/'+img)
  }