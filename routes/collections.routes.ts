import {Router,Request,Response} from "express";
import CollectionSchema from "../models/Collection";
import mongoose from "mongoose";
const router = Router();
const db = mongoose.connection;

router.get(
   '/tables',
    async (request:Request,response:Response) =>{
       try{
           response.status(200).send('sdbjkn')
       }catch (error) {
           response.status(500).send(error)
       }
    } 
)
export default router;