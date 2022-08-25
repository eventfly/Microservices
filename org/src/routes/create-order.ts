import express, { Request, Response } from 'express';

import { body } from 'express-validator';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';

import { Event } from '../models/event';
import { Order } from '../models/order';
import { natsWrapper } from '../nats-wrapper';
import { errorHandler } from '../middlewares/error-handler';
import { validateRequest } from '../middlewares/validate-request';
import { Package } from '../models/package';


const router = express.Router();

router.post('/api/org/order',
 [
    body('tickets').isArray().withMessage('Tickets must be an array')
 ],
    validateRequest,
    currentUser,
    requireAuth,
    errorHandler,
    async (req: Request, res: Response) => {
        const {packageId} = req.body;

        const pkg = await Package.findById(packageId);

        if (!pkg) {
            throw Error('Package not found');
        }

        const order = Order.build({
            organizer_id: req.currentUser!.ref_id,
            package_id: packageId,
            expiration_date: new Date(new Date().getTime() + (1000 * 60 * 15)),
            total_price: pkg!.price
        });

        await order.save();


        await natsWrapper.client.publish('order:created:org', JSON.stringify({
            id: order._id,
            organizer: order.organizer_id,
            package_id: order.package_id,
            expiration_date: order.expiration_date,
            created_at: order.created_at,
            total_price: order.total_price,
            status: order.status
        }) );
        
        res.status(201).send({
            order
        });

        

    });

export { router as createOrderRouter };