import { Router, Request, Response } from 'express';
import Collection from '../models/Collection';


const router = Router();

router.get(
    '/',
    async (req: Request, res: Response) => {
        try{
            const {field, collectionName} = req.body;

            const resultCollection = field && collectionName ? await Collection.aggregate(
                [
                    {"$match": {
                            'title': collectionName,
                            'items.title': { "$regex": field, "$options": "i" },
                    }},
                    {"$unwind": "$items"},
                    {"$match": {'items.title': { "$regex": field, "$options": "i" }}},
                ]) : [];

            const result = resultCollection.map( (item) => item.items )

            res.json({
                searchResult: result
            })
        } catch(e){
            res.status(500).json({message: 'something goes wrong'});
        }
    }
);

export default router;
