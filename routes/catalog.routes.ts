import { Router, Request, Response } from 'express';
import Collection from "../models/Collection";
// import bcrypt from 'bcryptjs';
// import jwt from'jsonwebtoken';

// import config from 'config';
// import {check, validationResult} from 'express-validator';
import Catalog from '../models/Catalog';


// interface User {
//     email: string;
//     password: string;
//     id: string;
// }

const router = Router();

// const JWT_SECRET: any = config.get('jwtSecret');

// '/api/catalog/tables'
router.get(
    '/tables', 
    async (req: Request, res: Response) => {
        try{
            console.log(22222222, req.path)
            // const {name} = req.body;
            // console.log(111, name)

            // const candidate = await User.findOne({email});

            // if(candidate){
            //     return res.status(400).json({message: 'this user is already exist'});
            // }

            // const hashedPassword = await bcrypt.hash(password, 12);

            // const tables = new Catalog({email, password: hashedPassword});
            const items = await Collection.findOne({title : "Tables"})
            // console.log(tables)

            if(items){
                return res.status(200).json(items);
            }
            // await user.save();

            // res.status(201).json({message: 'user is created'});
        } catch(e){
            // res.status(500).json({message: 'something goes wrong'});
        }
    }
);

export default router;