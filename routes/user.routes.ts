import {Router, Request, Response} from 'express';
import User from '../models/User';

import parser from "../config/cloadinary.config";
import {memoryStorage} from "multer";
import bcrypt from "bcryptjs";

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
            return response.status(404).json({message: 'user not found'});
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

            let user = User.findOne({_id: userId});
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
            }, {useFindAndModify: false})
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


export default router;