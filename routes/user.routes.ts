import {Router, Request, Response} from 'express';
import User from '../models/User';

import parser from "../helpers/cloadinary.config";
import bcrypt from "bcryptjs";
import {templateGetHandler} from "../helpers/templateGetHandler";
import {getItemData} from "../helpers/getItemData";


const router = Router();

router.get(
    '/:userId',
    async (request: Request, response: Response) => {
        try {
            const userId = request.params.userId;
            const candidate: any = await User.findOne({_id: userId});

            if (candidate) {
                return response.status(200).json({
                    email: candidate.email,
                    firstName: candidate.firstName,
                    lastName: candidate.lastName,
                    image: candidate.image

                });
            }
            return response.status(404).json({message: 'No such user'});
        } catch (error) {
            response.status(500).json({message: 'something goes wrong'});
        }
    }
);


router.put(
    '/:userId',
    parser.single('image'),
    async (request: Request, response: Response) => {
        try {
            const userId = request.params.userId;

            const user = User.findOne({_id: userId});
            if (!user) {
                return response.status(404).json({message: 'No such user'});
            }

            const {email, firstName, lastName} = request.body;
            let image;
            if (request.file !== undefined) {
                image = request.file.path;
            } else {
                image = request.body.image;
            }

            await User.findByIdAndUpdate({_id: userId}, {
                email,
                image: image,
                firstName,
                lastName
            }, {useFindAndModify: false});

            return response.status(200).json({message: 'Your data is successfully updated'});

        } catch (error) {
            response.status(500).json({message: 'something goes wrong'});
        }
    }
);

router.put(
    '/password/:userId',
    async (request: Request, response: Response) => {
        try {
            const userId = request.params.userId;
            const {newPassword, oldPassword} = request.body;

            const user: any = await User.findOne({_id: userId});
            if (!user) {
                return response.status(404).json({message: 'No such user'});
            }

            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return response.status(400).json({message: 'Incorrect password'});
            }

            const hashedPassword = await bcrypt.hash(newPassword, 12);
            await User.findByIdAndUpdate({_id: userId}, {password: hashedPassword}, {useFindAndModify: false});
            response.status(200).json({message: 'Your password is successfully updated'});

        } catch (error) {
            response.status(500).json({message: 'Something goes wrong'});
        }
    }
);

router.get(
    '/rating/:userId',
    templateGetHandler('rating')
);

router.get(
    '/comments/:userId',
    templateGetHandler('comments')
);

router.post(
    '/:userId/order-history',
    async (request: Request, response: Response) => {
        try {
            const items: Array<{ id: number, quantity: number }> = request.body.items;

            const itemsWithData = await Promise.all(items.map(async (element) => {
                const itemData = await getItemData(element.id);
                return ({
                    quantity: element.quantity,
                    id: element.id,
                    title: itemData.items[0].title,
                    url: itemData.items[0].url,
                    price: itemData.items[0].price,
                    collectionName: itemData.title
                });
            }));

            const newOrder = {
                date: Date.now(),
                items: itemsWithData
            };

            await User.findOneAndUpdate({_id: request.params.userId}, {$push: {'orderHistory': newOrder}}, {useFindAndModify: false});
            response.status(201).json({message: 'Your order is successfully recorded'});

        } catch (error) {
            response.status(500).json({message: 'Something goes wrong'});
        }
    }
);

router.get(
    '/:userId/order-history',
    async (request: Request, response: Response) => {
        try {
            const user: any = await User.findOne({_id: request.params.userId});
            response.status(200).json({
                orderHistory: user.orderHistory
            });

        } catch (error) {
            response.status(500).json({message: 'Something goes wrong'});
        }
    }
);

router.post(
    '/:userId/favorites',
    async (request: Request, response:Response)=>{
        try{
            const userId = request.params.userId;
            const itemId = request.body.id;

            const user: any = await User.findOne({_id: userId});
            if(!user){
                return response.status(404).json({message: 'No such user'});
            }

            const item: any = await User.findOne({_id: userId, favorites: {'$elemMatch' : {itemId: itemId}}});

            if(item){
                return response.status(400).json({message: 'This item has already been recorded'})
            }

            await User.findOneAndUpdate({_id: userId},{$push: {'favorites': {itemId: itemId }}});
            response.status(201).json({message: 'This item is successfully recorded.'});

        }catch (error) {
            response.status(500).json({message: 'Something goes wrong'});
        }
    }
);

router.get(
    '/:userId/favorites',
    async (request: Request, response: Response) => {
        try{
            const user: any = await User.findOne({_id: request.params.userId});
            const favorites = await Promise.all(user.favorites.map(async(element: {itemId: number}) => {
                const itemData = await getItemData(element.itemId);
                return{
                    id: element.itemId,
                    collectionName: itemData.title,
                    title: itemData.items[0].title,
                    url: itemData.items[0].url,
                    price: itemData.items[0].price,
                };

            }));
            response.status(200).json(favorites);
        }catch (error) {
            response.status(500).json({message: 'Something goes wrong'});
        }
    }
);

export default router;