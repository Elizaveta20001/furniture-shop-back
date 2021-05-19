import {Router} from 'express';
import {templateCollectionItemHandler, templateHandler} from '../helpers/templateHandler';
import Collection from '../models/Collection';


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


export default router;