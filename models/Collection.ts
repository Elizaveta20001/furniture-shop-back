import {Schema, model, Types} from 'mongoose';

import {CollectionInterface} from "../interfaces/interfaces";


const CollectionSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    items: [{
        id: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        collectionName : {
            type: String,
            required: false
        },
        comments: [{
            userId: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                required: true
            },
            text: {
                type: String,
                required: true
            },
            id: {
                type: Types.ObjectId,
                required: true
            }
        }],
        rating:[{
            userId: {
                type: String,
                required: true
            },
            value: {
                type: Number,
                required: true
            }

        }]
    }]
});


export default model<CollectionInterface>('Collection', CollectionSchema);
