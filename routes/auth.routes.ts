import {Router, Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const multer = require('multer');
import {CloudinaryStorage} from 'multer-storage-cloudinary';

const cloudinary = require('cloudinary').v2;

import {check, validationResult} from 'express-validator';
import User from '../models/User';
import config from "config";


interface User {
    email: string;
    password: string;
    id: string;
    firstName: string,
    lastName: string,
    image: string
}

const router = Router();

cloudinary.config({
    cloud_name: config.get('CLOUDINARY_NAME'),
    api_key: config.get('CLOUDINARY_KEY'),
    api_secret: config.get('CLOUDINARY_SECRET')
});

const storage = new CloudinaryStorage({
    cloudinary
});

const parser = multer({storage: storage});
const JWT_SECRET: any = config.get('jwtSecret');


//'/api/auth/register'
router.post(
    '/register',
    parser.single('image'),
    async (request: Request, response: Response) => {
        try {
            const {email, password, firstName, lastName} = request.body;
            const candidate = await User.findOne({email});

            if (candidate) {
                return response.status(400).json({message: 'this user is already exist'});
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = new User({email, password: hashedPassword, firstName, lastName, image: request.file.path});
            await user.save();

            response.status(201).json({message: 'user is created'});
        } catch (e) {
            response.status(500).json({message: 'something goes wrong'});
        }
    }
);


// '/api/auth/login'
router.post(
    '/login',
    [
        check('email', 'enter correct email').normalizeEmail().isEmail(),
        check('password', 'enter password').exists()
    ],
    async (request: Request, response: Response) => {
        try {
            const errors = validationResult(request);

            if (!errors.isEmpty()) {
                return response.status(400).json({
                    errors: errors.array(),
                    message: 'incorrect data on start'
                })
            }

            const {email, password} = request.body;

            const user: any = await User.findOne({email});

            if (!user) {
                return response.status(400).json({message: 'user is not find'});
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return response.status(400).json({message: 'incorrect password'});
            }

            const token = jwt.sign(
                {userId: user.id},
                JWT_SECRET,
                {expiresIn: '1h'}
            )

            response.json({
                token,
                userId: user.id
            })

        } catch (e) {
            response.status(500).json({message: 'something goes wrong'});
        }
    }
);

export default router;