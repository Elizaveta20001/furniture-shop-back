import {Request,Response} from 'express';


export const templateHandler = (Model: any) => async (request:Request, response:Response) =>{
    let collectionName = request.params.collectionName;
    collectionName = collectionName.charAt(0).toUpperCase() + collectionName.slice(1);

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
