import {Router} from 'express';
import Collection from '../models/Collection';
import {Request,Response} from 'express';


const router = Router();

router.get(
    '/',
    async (request:Request, response:Response) =>{
        try{
            const collection = await Collection.find()
            response.json(
                collection ? {
                    titles: collection.map(elem => elem.title),
                    urls: collection.map(elem => elem.items[0].url)
                } : {}
            )
        }catch (error) {
            response.status(500).send(error)
        }
    }
);



export default router;