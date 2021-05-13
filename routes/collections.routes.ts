import {Router,Request,Response} from "express";
import Collection from "../models/Collection";
import mongoose from "mongoose";
const router = Router();

router.get(
   '/tables',
    async (request:Request,response:Response) =>{
       try{
           const query = {title : "Tables"}
           const tables = await Collection.findOne(query)
           response.json({
               data: tables
           })
       }catch (error) {
           response.status(500).send(error)
       }
    } 
)

router.get(
    '/armchairs',
    async (request:Request,response:Response) =>{
        try{
            const query = {title : "Armchairs"}
            const tables = await Collection.findOne(query)
            response.json({
                data: tables
            })
        }catch (error) {
            response.status(500).send(error)
        }
    }
)
router.get(
    '/sofas',
    async (request:Request,response:Response) =>{
        try{
            const query = {title : "Sofas"}
            const tables = await Collection.findOne(query)
            response.json({
                data: tables
            })
        }catch (error) {
            response.status(500).send(error)
        }
    }
)
router.get(
    '/beds',
    async (request:Request,response:Response) =>{
        try{
            const query = {title : "Beds"}
            const tables = await Collection.findOne(query)
            response.json({
                data: tables
            })
        }catch (error) {
            response.status(500).send(error)
        }
    }
)
export default router;