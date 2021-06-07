import config from "config";
import {CloudinaryStorage} from "multer-storage-cloudinary";
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: config.get('CLOUDINARY_NAME'),
    api_key: config.get('CLOUDINARY_KEY'),
    api_secret: config.get('CLOUDINARY_SECRET')
});

const storage = new CloudinaryStorage({
    cloudinary
});

const parser = multer({storage: storage});

export default parser;