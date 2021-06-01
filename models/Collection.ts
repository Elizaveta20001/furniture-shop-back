import {Schema, model, Document, Types} from 'mongoose';


interface CollectionInterface extends Document{
    title: string,
    items: CollectionItemInterface[],
};

interface CollectionItemInterface extends Document{
    id: number;
    title: string,
    url: string,
    description: string,
    price: number,
    comments: Comment[],
    rating: Rating[]

};

interface Comment{
    email: string,
    createdAt: Date,
    text: string,
    id: Types.ObjectId
}

interface Rating{
    userId: String,
    value: number
}

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
        comments: [{
            email: {
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
