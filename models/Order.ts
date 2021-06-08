import {model, Schema, Types} from "mongoose";


const OrderSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    items: [
        {
            title:{
                type: String,
                required: true
            },
            price:{
                type: Number,
                required: true
            },
            url:{
                type: String,
                required: true
            },
            quantity:{
                type: Number,
                required: true
            },
            id:{
                type: String,
                required: true
            },
        }
    ]
});


export default model('Order', OrderSchema);