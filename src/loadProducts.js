// import mongoose from 'mongoose';  
// import conectarDB  from './config/siennadb.js';  
// import Product from './models/Product.js';  
// import { 
//   eclatEternel, 
//   lauraMajestueuse, 
//   veloursDivin, 
//   heritageDor, 
//   opulenceSauvage,
//   noirElegance,
//   cielDeMinuit 
// } from './data/productsData.js';  


// // Función para cargar los productos
// const loadProducts = async () => {
//   try {
//     // Limpiar la colección de productos (opcional)
//     await Product.deleteMany();  // Esto eliminará los productos actuales de la base de datos

//     // Crear un array con todos los productos a insertar
//     const allProducts = [
//       ...eclatEternel,
//       ...lauraMajestueuse,
//       ...veloursDivin,
//       ...heritageDor,
//       ...opulenceSauvage,
//       ...noirElegance,
//       ...cielDeMinuit
//     ];

//     // Insertar todos los productos en la base de datos
//     const result = await Product.insertMany(allProducts);

//     console.log(`Se han cargado ${result.length} productos exitosamente.`);
//     mongoose.disconnect();  // Desconectar después de completar la carga
//   } catch (error) {
//     console.error('Error al cargar los productos:', error);
//     mongoose.disconnect();  // Desconectar en caso de error
//   }
// };

// // Ejecutar la función principal
// const run = async () => {
//   await conectarDB();  // Establecer la conexión a la base de datos
//   await loadProducts();  // Cargar los productos
// };

// run();
