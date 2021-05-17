import {Request,Response} from 'express';


export const templateHandler = (collectionName: string, Model: any) => async (request:Request, response:Response) =>{
    try{
        const query = {title : collectionName}
        const collection = await Model.findOne(query)
        response.json(
            collection ? {
                items: collection.items,
                title: collection.title
            }
            : {}
        )
    }catch (error) {
        response.status(500).send(error)
    }
};