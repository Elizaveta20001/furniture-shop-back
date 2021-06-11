import  {Request, Response} from "express";

import User from "../models/User";


export const templateSearchHandler = (Model: any) => async (request: Request, response: Response) => {
    try {
        const {field, collectionName} = request.query;
        const userId = request.params.userId;

        let searchCondition: any;

        collectionName ?
            searchCondition = {
                'items.title': {"$regex": field, "$options": "i"},
                'title': collectionName
            } : searchCondition = {'items.title': {"$regex": field, "$options": "i"}}

        const resultCollection = field ? await Model.aggregate(
            [
                {"$match": searchCondition},
                {"$unwind": "$items"},
                {"$match": {'items.title': {"$regex": field, "$options": "i"}}},
            ]) : [];

        const searchResult = await Promise.all(resultCollection.map(async (item: any) => {
            let resultItem: { [k: string]: any } = item.items;
            const result = await User.findOne({_id: userId, 'favorites.itemId': item.items.id});
            if (result) {
                resultItem.isInFavorites = true;
            }
            resultItem.collectionName = item.title.toLowerCase();
            return resultItem;
        }));

        response.json({
            searchResult: searchResult
        });
    } catch (e) {
        response.status(500).json({message: e.message});
    }
}