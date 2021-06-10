import {Types} from "mongoose";


export interface CollectionInterface {
    title: string,
    items: CollectionItemInterface[],
}

export interface CollectionItemInterface {
    id: number;
    title: string,
    url: string,
    description: string,
    price: number,
    collectionName?: string,
    comments: Comment[],
    rating: Rating[]
}

export interface Comment {
    userId: string,
    createdAt: Date,
    text: string,
    id: Types.ObjectId
}

export interface Rating {
    userId: String,
    value: number
}

export interface User {
    email: string;
    password: string;
    id: string;
    firstName: string,
    lastName: string,
    image: string
}