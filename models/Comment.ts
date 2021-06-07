import {Schema, model, Types} from "mongoose";


const CommentSchema: Schema = new Schema({
    id : {
        type: Types.ObjectId,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true
    },
})


export default model('CommentSchema',CommentSchema);