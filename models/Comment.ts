import {Schema, model, Document,Types} from "mongoose";


const CommentSchema: Schema = new Schema({
    id : {
        type: Types.ObjectId,
        required: true
    },
    email:{
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