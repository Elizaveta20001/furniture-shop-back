import {Request, Response} from "express";
import {Types} from "mongoose";

import User from "../models/User";
import {Comment} from './../interfaces/interfaces';


export const templateCommentHandler = (Model: any) => async (request: Request, response: Response) => {
    const {text, createdAt, user} = request.body;

    let collectionName = request.params.collectionName;
    collectionName = collectionName.charAt(0).toUpperCase() + collectionName.slice(1);

    try {
        const userData: any = await User.findOne({_id: user});

        if (!userData) {
            return response.status(401).json({message: 'No such user'});
        } else {
            const newComment: Comment = {
                text,
                createdAt,
                userId: user,
                id: new Types.ObjectId()
            };

            const query = {title: collectionName, items: {$elemMatch: {id: request.params.id}}};
            await Model.findOneAndUpdate(query, {$push: {'items.$.comments': newComment}}, {useFindAndModify: false});

            response.status(200).json({message: 'Your comment has been successfully recorded'});
        }
    } catch (error) {
        response.status(500).json(error);
    }
};