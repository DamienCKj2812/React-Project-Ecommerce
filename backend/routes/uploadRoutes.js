import path from 'path';
import  express from 'express';
import multer from 'multer' //primarily used for uploading files in web applications. It is a node.js middleware 

const router = express.Router();

// Parameters:
// req: The request object.
// file: Information about the uploaded file.
// cb: Callback function.


const storage = multer.diskStorage({ //The disk storage engine gives you full control on storing files to disk
    //There are two options available, destination and filename. They are both functions that determine where the file should be stored.
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); //destination is used to determine within which folder the uploaded files should be stored.
    },

    filename: (req, file, cb) => { //filename is used to determine what the file should be named inside the folder
        const extname = path.extname(file.originalname);  //Uses the path module to extract the file extension from the original filename.
        cb(null, `${file.fieldname}-${Date.now()}${extname}`) //Constructs a unique filename by combining the fieldname (name of the form field for the file), the current timestamp (to ensure uniqueness), and the file extension.
    },
});

const fileFilter = (req, file, cb) => {
    // Define regular expressions for allowed file extensions and MIME types
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

    // Get the file extension and MIME type of the uploaded file
    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype

    // Check if the file extension and MIME type match the allowed types
    if (filetypes.test(extname) && mimetypes.test(mimetype)){
        // If the file is accepted, invoke the callback with null as the first parameter
        cb(null, true) //In Node.js, when using callbacks, it's a common practice to adhere to a convention where the first parameter of the callback function is reserved for an error object.
    } else {
        // If the file is not accepted, invoke the callback with an error and false as parameters
        cb(new Error("Images only"), false);
    }
}

const upload = multer({storage, fileFilter}); //The multer middleware is configured with the provided storage and fileFilter options.
const uploadSingleImage = upload.single('image'); //creates middleware specifically for handling a single file upload with the field name "image."

router.post('/', (req, res) => {
    uploadSingleImage(req, res, (err) => {
        if (err) {
            res.status(400).send({message: err.message});
        } else if (req.file) {
            res.status(200).send({
                message: "Image updated successfully",
                image: `/${req.file.path}` //Creating a URL that the client can use to retrieve the uploaded image. I
            })
        } else {
            res.status(400).send({message: "No image file provided"});
        }
    });
})

export default router;