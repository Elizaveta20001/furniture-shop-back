import {Router} from 'express';

import {templateHandler} from '../helpers/templateHandler';
import {templateCollectionItemHandler} from "../helpers/templateCollectionItemHandler";
import Collection from '../models/Collection';
import {templateCommentHandler} from "../helpers/templateCommentHandler";
import {templateRatingHandler} from "../helpers/templateRatingHandler";


const router = Router();

router.get(
    '/armchairs',
    templateHandler('Armchairs', Collection)
);
router.get(
    '/armchairs/:id',
    templateCollectionItemHandler("Armchairs", Collection)
);
router.get(
    '/tables',
    templateHandler('Tables', Collection)
);
router.get(
    '/tables/:id',
    templateCollectionItemHandler('Tables', Collection)
);
router.get(
    '/sofas',
    templateHandler("Sofas", Collection)
);
router.get(
    '/sofas/:id',
    templateCollectionItemHandler("Sofas", Collection)
);
router.get(
    '/beds',
    templateHandler("Beds", Collection)
);
router.get(
    '/beds/:id',
    templateCollectionItemHandler("Beds", Collection)
);

router.post(
    '/armchairs/comment/:id',
    templateCommentHandler("Armchairs", Collection)
);

router.post(
    '/beds/comment/:id',
    templateCommentHandler("Beds", Collection)
);

router.post(
    '/sofas/comment/:id',
    templateCommentHandler("Sofas", Collection)
);

router.post(
    '/tables/comment/:id',
    templateCommentHandler("Tables", Collection)
);


router.post(
    '/armchairs/rating/:id',
    templateRatingHandler("Armchairs", Collection)
);

router.post(
    '/beds/rating/:id',
    templateRatingHandler("Beds", Collection)
);

router.post(
    '/sofas/rating/:id',
    templateRatingHandler("Sofas", Collection)
);

router.post(
    '/tables/rating/:id',
    templateRatingHandler("Tables", Collection)
);




export default router;