import {Request, Response} from "express";
import {getUserEmail} from "./getUserEmail";

export const templateCollectionItemHandler = (Model: any) => async (request: Request, response: Response) => {
    const id = request.params.id;
    let collectionName = request.params.collectionName;
    collectionName = collectionName.charAt(0).toUpperCase() + collectionName.slice(1);

    try {
        const query = {title: collectionName, 'items.id': id};
        const collection = await Model.findOne(query, {"items.$": id});
        const item = collection.items[0];

        const comments = await Promise.all(item.comments.map(async (element: any) => {
            return ({
                text: element.text,
                createdAt: element.createdAt,
                email: await getUserEmail(element.userId)
            })
        }));

        response.json({
            title: item.title,
            description: item.description,
            url: item.url,
            price: item.price,
            rating: item.rating,
            id: item.id,
            comments: comments
        });

    } catch (error) {
        response.status(500).send(error);
    }
};