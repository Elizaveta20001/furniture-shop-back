import {Schema, model, Types} from 'mongoose';

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

})
export default model("Collection",CollectionSchema);