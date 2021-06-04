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
    links: [{
        type: Types.ObjectId,
        ref: 'Link'
    }],
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
    }
});



export default model('User', schema);