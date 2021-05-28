import {Request, Response} from "express";
import {Types} from "mongoose";

import User from "../models/User";
import CommentSchema from "../models/Comment";


export const templateCommentHandler = (collectionName: string, Model: any) => async (request: Request, response: Response) => {
    const {text, createdAt} = request.body;
    try {
        const userData: any = await User.findOne({_id: request.body.user});

        if(!userData){
            response.status(401).json({message: 'No such user'});
        }
        else{
            const email = userData.email;

            const newComment = new CommentSchema({
                text,
                createdAt,
                email,
                id: new Types.ObjectId()
            });

            const query = {title: collectionName, items: {$elemMatch: {id: request.params.id}}};
            await Model.findOneAndUpdate(query, {$push: {'items.$.comments': newComment}}, {useFindAndModify: false});
            response.status(200);
        }
    } catch (error) {
        response.status(500).json(error);
    }
};