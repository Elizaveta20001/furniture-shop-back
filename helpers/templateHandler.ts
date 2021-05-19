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

export const templateCollectionItemHandler = (collectionName: string, Model: any) => async (request:Request, response:Response) =>{
    const id = request.params.id;
    try{
        const query = {title: collectionName, 'items.id': id };
        const collection = await Model.findOne(query,{ "items.$": id});
        response.json(
            ...collection.items
        )
    }catch (error) {
        response.status(500).send(error);
    }
};