import {Router} from 'express';
import { templateHandler } from '../helpers/templateHandler';
import Catalog from '../models/Catalog';


const router = Router();

router.get(
    '/armchairs',
    templateHandler('Armchairs', Catalog)
);
router.get(
    '/tables',
    templateHandler('Tables', Catalog)
);
router.get(
    '/sofas',
    templateHandler("Sofas", Catalog)
);
router.get(
    '/beds',
    templateHandler("Beds", Catalog)
);


export default router;