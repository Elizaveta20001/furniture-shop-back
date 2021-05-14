import {Router,Request,Response} from "express";
import Collection from "../models/Collection";
import mongoose from "mongoose";
const router = Router();
const templateHandler = (collectionName: string) => async (request:Request,response:Response) =>{
    try{
        const query = {title : collectionName}
        const armchairs = await Collection.findOne(query)
        response.json(
            armchairs ? {items: armchairs.items} : {}
        )
    }catch (error) {
        response.status(500).send(error)
    }
}

router.get(
    '/armchairs',
    templateHandler('Armchairs')
)
router.get(
    '/tables',
    templateHandler('Tables')
)
router.get(
    '/sofas',
    templateHandler("Sofas")
)
router.get(
    '/beds',
    templateHandler("Beds")
)
export default router;