import {Router} from 'express';

import {templateHandler} from '../helpers/templateHandler';
import {templateCollectionItemHandler} from "../helpers/templateCollectionItemHandler";
import Collection from '../models/Collection';
import {templateCommentHandler} from "../helpers/templateCommentHandler";
import {templateRatingHandler} from "../helpers/templateRatingHandler";


const router = Router();

router.get(
    '/:collectionName',
    templateHandler(Collection)
);
router.get(
    '/:collectionName/:id',
    templateCollectionItemHandler(Collection)
);

router.get(
    '/:collectionName/user/:userId',
    templateHandler(Collection)
);

router.post(
    '/:collectionName/comment/:id',
    templateCommentHandler( Collection)
);

router.post(
    '/:collectionName/rating/:id',
    templateRatingHandler(Collection)
);


export default router;