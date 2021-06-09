import {Schema, model, Types} from 'mongoose';

const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    orderHistory: [
        {
            date:{
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
                    collectionName: {
                        type: String,
                        required: true
                    }
                }
            ]
        }
    ]
});



export default model('User', schema);