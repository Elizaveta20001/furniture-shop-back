import { Router, Request, Response } from 'express';

import Collection from '../models/Collection';
import {templateSearchHandler} from "../helpers/templateSearchHandler";

const auth = require('./../middlewere/auth.middleware');

const router = Router();

router.get(
    '/',
    templateSearchHandler(Collection)
);

router.get(
    '/:userId',
    auth,
    templateSearchHandler(Collection)
)

export default router;
