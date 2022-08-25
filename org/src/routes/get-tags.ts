import express, {Request, Response} from 'express';
import { errorHandler } from '../middlewares/error-handler';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { Tag } from '../models/tag';

const router = express.Router();

router.get('/api/org/tag', [], 
    currentUser, 
    requireAuth,
    errorHandler, 
    
    async (req: Request, res:Response) => {
        const tags = await Tag.find({ });
        res.status(200).send(tags);  
    }
)

export { router as getTagsRouter };