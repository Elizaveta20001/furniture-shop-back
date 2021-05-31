import { Router, Request, Response } from 'express';
import Collection from '../models/Collection';

const router = Router();

router.get(
    '/',
    async (req: Request, res: Response) => {
        try{
            const {field, collectionName} = req.query;
            let searchCondition:any;

            collectionName ?
                searchCondition = {
                    'items.title': { "$regex": field, "$options": "i" },
                    'title' : collectionName
                } : searchCondition = { 'items.title': { "$regex": field, "$options": "i" } }

            const resultCollection = field ? await Collection.aggregate(
                [
                    {"$match": searchCondition},
                    {"$unwind": "$items"},
                    {"$match": {'items.title': { "$regex": field, "$options": "i" }}},
                ]) : [];

            res.json({
                searchResult: resultCollection.map( (item) => item.items )
            })
        } catch(e){
            res.status(500).json({message: 'something goes wrong'});
        }
    }
);

export default router;
