import express, { Request, Response } from 'express';
import { currentUser } from '../middlewares/current-user';
import { errorHandler } from '../middlewares/error-handler';
import { requireAuth } from '../middlewares/require-auth';
import { Feed } from '../models/feed';
import { ObjectId } from 'bson';

const router = express.Router();

router.get('/api/newsfeed/feed', currentUser, requireAuth, errorHandler, async (req: Request, res: Response) => {
    
    const feed = await Feed.find({user_id: new ObjectId(req.currentUser!.ref_id)});

    if (!feed){
        throw new Error('Feed not found');
    } else {
        res.status(200).send(feed);
    }
})

export { router as getFeedRouter };