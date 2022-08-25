import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';

import { stripe } from '../stripe';

import { OrgOrder } from '../models/order-org';
import { Payment } from '../models/payment';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post('/api/payment/org/', currentUser, requireAuth, async (req: Request, res: Response) => {
    const {token, order_id} = req.body;

    const order = await OrgOrder.findById(order_id);

    if (!order) {
        throw new Error('Order not found');
    }

    if (order.status === 'paid') {
        throw new Error('Order already paid');
    }

    if (order.user_id !== req.currentUser!.ref_id) {
        throw new Error('Order not found');
    }

    const charge = await stripe.charges.create({
        currency: 'usd',
        amount: order.total_price * 100,
        source: token
    });
    
    const payment = Payment.build({
        order_id,
        stripe_id: charge.id
    });

    order.status = 'paid'

    await payment.save();
    await order.save();

    natsWrapper.client.publish('order:paid:org', JSON.stringify({
        order_id: order._id,
        payment: payment
    }));

    res.status(201).send(payment);
    
})

export { router as createPaymentOrgRouter };