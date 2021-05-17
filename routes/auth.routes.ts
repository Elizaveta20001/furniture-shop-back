import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from'jsonwebtoken';

import config from 'config';
import {check, validationResult} from 'express-validator';
import User from '../models/User';


interface User {
    email: string;
    password: string;
    id: string;
}

const router = Router();

const JWT_SECRET: any = config.get('jwtSecret');


// '/api/auth/register'
router.post(
    '/register', 
    [
        check('email', 'incorrect email').isEmail(),
        check('password', 'need more than 6 symbols').isLength({min: 6})
    ],
    async (req: Request, res: Response) => {
        try{
            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'incorrect data'
                })
            }

            const {email, password} = req.body;

            const candidate = await User.findOne({email});

            if(candidate){
                return res.status(400).json({message: 'this user is already exist'});
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = new User({email, password: hashedPassword});
            await user.save();

            res.status(201).json({message: 'user is created'});
        } catch(e){
            res.status(500).json({message: 'something goes wrong'});
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
    async (req: Request, res: Response) => {
        try{
            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'incorrect data on start'
                })
            }

            const {email, password} = req.body;

            const user: any = await User.findOne({email});

            if(!user){
                return res.status(400).json({message: 'user is not find'});
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res.status(400).json({message: 'incorrect password'});
            }

            const token = jwt.sign(
                { userId: user.id },
                JWT_SECRET,
                { expiresIn: '1h' }
            )

            res.json({
                token,
                userId: user.id
            })
            
        } catch(e){
            res.status(500).json({message: 'something goes wrong'});
        }
    }
);

export default router;