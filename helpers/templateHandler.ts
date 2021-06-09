import e, {Request,Response} from 'express';

import {CollectionItemInterface} from "../models/Collection";
import User from '../models/User';


export const templateHandler = (Model: any) => async (request:Request, response:Response) =>{
    let collectionName = request.params.collectionName;
    const userId = request.params.userId;
    collectionName = collectionName.charAt(0).toUpperCase() + collectionName.slice(1);

    try{
        const query = {title : collectionName}
        const collection = await Model.findOne(query)
        if(!userId){
            response.json(
                collection ? {
                        items: collection.items,
                        title: collection.title
                    }
                    : {}
            )
        }
        else{
            const newItems = await Promise.all(collection.items.map(async (element: CollectionItemInterface) => {
                const item = await User.findOne({_id: userId, 'favorites.itemId': element.id});
                if(item){
                    return{
                        id: element.id,
                        collectionName: element.collectionName,
                        title: element.title,
                        url: element.url,
                        comments: element.comments,
                        rating: element.rating,
                        description: element.description,
                        price: element.price,
                        isInFavorites: true

                    }
                }
                return element;
            }))
            return response.json(collection ? {
                    items: newItems,
                    title: collection.title
                }
                : {})
        }

    }catch (error) {
        response.status(500).send(error)
    }
};
