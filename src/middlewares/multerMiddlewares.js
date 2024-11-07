import multer from 'multer';

//Guardar la imagen en la carpeta uploads y extrar el nombre original
const save = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        if(file !== null){
            const ext = file.originalname.split('.').pop()
            cb(null, Date.now() + '.' +ext );
        }
    },
});
// Extensiones que acepta como imagen
const filter = (req,file, cb) =>{
    if(file && (file.mimetype === 'image/jpg' || file.mimetype ==='image/jpeg'
        || file.mimetype === 'image/png')){
            cb(null, true)
        }else {
            cb(null, false)
        }
}

export const upload  = multer({ storage:save, fileFilter:filter });

