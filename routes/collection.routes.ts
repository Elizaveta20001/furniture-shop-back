import {Router} from 'express';

import {templateHandler} from '../helpers/templateHandler';
import {templateCollectionItemHandler} from "../helpers/templateCollectionItemHandler";
import Collection from '../models/Collection';
import {templateCommentHandler} from "../helpers/templateCommentHandler";
import {templateRatingHandler} from "../helpers/templateRatingHandler";

const auth = require('./../middlewere/auth.middleware');


const router = Router();

router.get(
    '/:collectionName',
    templateHandler(Collection)
);

router.get(
    '/:collectionName/user/:userId',
    auth,
    templateHandler(Collection)
);

router.get(
    '/:collectionName/:id',
    templateCollectionItemHandler(Collection)
);

router.get(
    '/:collectionName/:id/user/:userId',
    auth,
    templateCollectionItemHandler(Collection)
);

router.post(
    '/:collectionName/comment/:id',
    auth,
    templateCommentHandler( Collection)
);

router.post(
    '/:collectionName/rating/:id',
    auth,
    templateRatingHandler(Collection)
);


export default router;