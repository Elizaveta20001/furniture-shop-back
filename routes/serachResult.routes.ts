import { Router, Request, Response } from 'express';
import { search } from '../helpers/search';
import Collection from '../models/Collection';


const router = Router();

router.post(
    '/', 
    async (req: Request, res: Response) => {
        try{
            const {field} = req.body;
            const collection = await Collection.find();

            const result = field ? search(field, collection) : [];

            res.json({
                searchResult: result
            })
        } catch(e){
            res.status(500).json({message: 'something goes wrong'});
        }
    }
);

export default router;