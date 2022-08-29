import express, { Request, Response } from 'express';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { errorHandler } from '../middlewares/error-handler';
import { validateRequest } from '../middlewares/validate-request';
import { body } from 'express-validator';
import { Activity } from '../models/activity';

const router = express.Router();

router.get('/api/newsfeed/post/:id/activity/all', [
], 
    validateRequest, 
    currentUser, 
    requireAuth, 
    errorHandler, 
    async (req: Request, res:Response) => {

        const {id} = req.params;

        const activities = await Activity.findOne({ post_id: id}).populate({
            path: 'user_id',
            select: 'name avatar email'
        }).sort({'quiz_score': -1});

        res.status(200).send(activities);

});

export { router as getAllActivityRouter };