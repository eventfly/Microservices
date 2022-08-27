import express, { Request, Response } from 'express';

import { currentUser } from '../middlewares/current-user';
import { Order } from '../models/order';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.get('/api/participant/order/:id', 
    currentUser, 
    requireAuth, 
    async (req: Request, res: Response) => {
        const orders = await Order.findById(req.params.id);

        res.status(200).send(orders);
    }
);

export { router as getOrderRouter };