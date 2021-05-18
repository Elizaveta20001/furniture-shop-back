import {Schema, model, Document} from 'mongoose';


interface CollectionInterface extends Document{
    title: string,
    items: CollectionItemInterface[],
};

interface CollectionItemInterface extends Document{
    id: number;
    title: string,
    url: string,
    description: string,
    price: number
};

const CollectionSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    items: [{
        id : {
            type: Number,
            required: true
        },
        title:{
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
        url : {
            type: String,
            required: true
        }
    }]
});


export default model<CollectionInterface>('Collection', CollectionSchema);