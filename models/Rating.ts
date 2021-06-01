import {Schema, model} from "mongoose";


const RatingSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
})


export default model('RatingSchema', RatingSchema);