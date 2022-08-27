import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import express, { Request, Response } from 'express';
import { errorHandler } from '../middlewares/error-handler';
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/org/:orgId/biling-details', [], currentUser, requireAuth, errorHandler, async (req: Request, res:Response) => {
    
    const orders = await Order.find({ organizer_id: req.params.orgId }).populate('package_id')
    res.status(200).send({orders});


});

export { router as getBillingDetailsRouter };