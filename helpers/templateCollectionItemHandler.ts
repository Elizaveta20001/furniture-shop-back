import {Request, Response} from "express";

import User from "../models/User";
import {getUserEmail} from "./getUserEmail";
import {Comment} from "../interfaces/interfaces";


export const templateCollectionItemHandler = (Model: any) => async (request: Request, response: Response) => {
    const {id, userId} = request.params;

    let collectionName = request.params.collectionName;
    collectionName = collectionName.charAt(0).toUpperCase() + collectionName.slice(1);

    try {
        const query = {title: collectionName, 'items.id': id};
        const collection = await Model.findOne(query, {"items.$": id});
        const item = collection.items[0];

        const comments = await Promise.all(item.comments.map(async (element: Comment) => {
            return ({
                text: element.text,
                createdAt: element.createdAt,
                email: await getUserEmail(element.userId)
            });
        }));

        const resultItem: { [k: string]: any } = {
            title: item.title,
            description: item.description,
            url: item.url,
            price: item.price,
            rating: item.rating,
            id: item.id,
            comments: comments
        };

        const user: any = await User.findOne({_id: userId, 'favorites.itemId': id});

        if (!user) {
            return response.json(resultItem);
        } else {
            resultItem['isInFavorites'] = true;
            return response.json(resultItem);
        }

    } catch (error) {
        response.status(500).send(error);
    }
};