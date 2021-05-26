import {Router, Response, Request} from "express";
import {Stripe} from 'stripe';
import {v4 as uuid4} from 'uuid';
import config from "config";


const router = Router();
const stripe = new Stripe(config.get('apiKey'), {
    apiVersion: '2020-08-27',
    typescript: true,
});

router.post('/', (request: Request, response: Response) => {
    const {totalPrice, token} = request.body;
    const idempotencyKey = uuid4();

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: totalPrice * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
        }, {idempotencyKey})
            .then(result => response.status(200).json(result));

    }).catch(error => response.status(500).json(error));

});


export default router;


