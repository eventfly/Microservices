import { currentUser } from '../middlewares/current-user';
import express, {Request, Response} from 'express';
import { requireAuth } from '../middlewares/require-auth';
import { errorHandler } from '../middlewares/error-handler';
import { User } from '../models/user';

const router = express.Router();

router.get('/api/newsfeed/:id/events', 
    [],
    currentUser,
    requireAuth,
    errorHandler,
    async (req: Request, res: Response) => {

        const user_id = req.params.id;
        const user = await User.findById(user_id).populate('events');
        
        if (!user) {
            throw new Error('User not found');
        }

        const events = user.events;

        res.status(200).send(events);
});

export { router as getAllEventsRouter };