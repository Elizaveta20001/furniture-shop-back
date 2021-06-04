import {Router, Request, Response} from 'express';
import User from '../models/User';


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
        }catch (e) {
            response.status(500).json({message: 'something goes wrong'});
        }
    }
);


export default router;