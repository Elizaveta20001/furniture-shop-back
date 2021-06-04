import {Request, Response} from "express";

export const templateCollectionItemHandler = (Model: any) => async (request:Request, response:Response) =>{
    const id = request.params.id;
    let collectionName = request.params.collectionName;
    collectionName = collectionName.charAt(0).toUpperCase() + collectionName.slice(1);

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