import {Request, Response} from "express";

import User from "../models/User";
import RatingSchema from "../models/Rating";


export const templateRatingHandler = (collectionName: string, Model: any) => async (request: Request, response: Response) => {
    const {userId, value} = request.body;
    try {
        const query = {title: collectionName, items: {$elemMatch: {id: request.params.id}}};
        const userData: any = await User.findOne({_id: request.body.userId});

        if(!userData){
            return response.status(401).json({message: 'No such user'});
        }

        else{
            const data = await Model.findOne(query, { "items.$": request.params.id});
            const user = data.items[0].rating.filter((element: {userId: string, value: number}) => element.userId === userId);
            if(user.length !== 0){
                return response.status(400).json({message: 'You have already rated this product'});
            }

            const newRating = new RatingSchema({
                userId,
                value,
            });

            await Model.findOneAndUpdate(query, {$push: {'items.$.rating': newRating}}, {useFindAndModify: false});
            response.status(200).json({message: 'You have successfully rated this product'});

        }
    } catch (error) {
        response.status(500).json(error);
    }
};