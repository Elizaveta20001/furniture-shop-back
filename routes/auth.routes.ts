import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from'jsonwebtoken';
import multer from 'multer';

import config from 'config';
import {check, validationResult} from 'express-validator';
import User from '../models/User';


interface User {
    email: string;
    password: string;
    id: string;
    firstName: string,
    lastName: string,
    image: string
}

const router = Router();

const upload = multer({ dest: 'uploads/' });
const JWT_SECRET: any = config.get('jwtSecret');


// '/api/auth/register'
router.post(
    '/register',
    upload.single('image'),
    async (request: Request, response: Response) => {
        try{
            // const errors = validationResult(request);
            //
            // if(!errors.isEmpty()){
            //     return response.status(400).json({
            //         errors: errors.array(),
            //         message: 'incorrect data'
            //     })
            // }

            // const {email, password, firstName, lastName, image} = request.body;
            console.log(request.body.name);
            console.log(request.file);
            // const candidate = await User.findOne({email});
            //
            // if(candidate){
            //     return response.status(400).json({message: 'this user is already exist'});
            // }
            //
            // const hashedPassword = await bcrypt.hash(password, 12);
            // console.log(image);
            //
            // response.status(201).json({
            //     firstName,
            //     lastName,
            //     password: hashedPassword,
            //     email
            // });
            // const user = new User({email, password: hashedPassword, firstName, lastName});
            // await user.save();
            //
            // response.status(201).json({message: 'user is created'});
        } catch(e){
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
        try{
            const errors = validationResult(request);

            if(!errors.isEmpty()){
                return response.status(400).json({
                    errors: errors.array(),
                    message: 'incorrect data on start'
                })
            }

            const {email, password} = request.body;

            const user: any = await User.findOne({email});

            if(!user){
                return response.status(400).json({message: 'user is not find'});
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return response.status(400).json({message: 'incorrect password'});
            }

            const token = jwt.sign(
                { userId: user.id },
                JWT_SECRET,
                { expiresIn: '1h' }
            )

            response.json({
                token,
                userId: user.id
            })
            
        } catch(e){
            response.status(500).json({message: 'something goes wrong'});
        }
    }
);

export default router;