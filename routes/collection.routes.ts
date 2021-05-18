import {Router} from 'express';
import { templateHandler } from '../helpers/templateHandler';
import Collection from '../models/Collection';


const router = Router();

router.get(
    '/armchairs',
    templateHandler('Armchairs', Collection)
);
router.get(
    '/tables',
    templateHandler('Tables', Collection)
);
router.get(
    '/sofas',
    templateHandler("Sofas", Collection)
);
router.get(
    '/beds',
    templateHandler("Beds", Collection)
);


export default router;