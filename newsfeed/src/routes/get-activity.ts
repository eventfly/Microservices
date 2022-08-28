import express, { Request, Response } from 'express';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { errorHandler } from '../middlewares/error-handler';
import { validateRequest } from '../middlewares/validate-request';
import { body } from 'express-validator';
import { Activity } from '../models/activity';

const router = express.Router();

router.get('/api/newsfeed/activity', [
    body('user_id').not().isEmpty().
    withMessage('user_id is required'),
    body('post_id').
    not().isEmpty().
    withMessage('post_id is required')
], 
    validateRequest, 
    currentUser, 
    requireAuth, 
    errorHandler, 
    async (req: Request, res:Response) => {

        const {post_id, user_id} = req.body;

        const activity = await Activity.findOne({ post_id, user_id });

        res.status(200).send(activity);

});

export { router as getActivityRouter };