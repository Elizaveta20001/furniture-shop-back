import {Request, Response} from "express";

import User from "../models/User";
import Collection from "../models/Collection";
import {getQuery} from "./queryForRatingAndComment";


export const templateGetHandler = (type: string) => async (request: Request, response: Response) => {
    let userId = request.params.userId;

    try {
        const user = await User.findOne({_id: userId});
        if (!user) {
            return response.status(404).json({message: 'User not found'});
        }
        const items = await Collection.aggregate(
            [getQuery(type, userId)]
        )

        let result: any = [];
        items.forEach((element) => {
            if(element.items.length > 0){
                result.push(...element.items);
            }
        })

        response.status(200).json(
            result
        )
    } catch (error) {
        response.status(500).json({message: 'Something goes wrong'});
    }
};