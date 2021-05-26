import {Request, Response} from "express";

import User from "../models/User";
import CommentSchema from "../models/Comment";
import {Types} from "mongoose";


export const templateCommentHandler = (collectionName: string, Model: any) => async (request:Request, response:Response) =>{
    const {text, createdAt} = request.body;
    try{
        const userData: any = await User.findOne({_id: request.body.user});
        const email = userData.email;

        const newComment = new CommentSchema({
            text,
            createdAt,
            email,
            id: new Types.ObjectId()
        });

        const query = {title: collectionName, 'items.id': request.params.id };
        const collection: any = await Model.findOne(query,{ "items.$": request.params.id});
        console.log(collection);
        response.status(200).json("OK");
    }catch (error){
        response.status(500).json(error);
    }
};