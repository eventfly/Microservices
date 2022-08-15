import express, { Request, Response } from 'express';

import {body} from 'express-validator';
import { errorHandler } from '../middlewares/error-handler';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { accessControl } from '../middlewares/access-control';
import { Tag } from '../models/tag';

const router = express.Router();

router.post('/api/org/tag', 
    [
        body('name').
        notEmpty().
        withMessage('Name is required'),
    ], 
    currentUser, 
    requireAuth,
    accessControl('Organizer', 'Manager'), 
    errorHandler, 
    
    async (req: Request, res:Response) => {
        const { name } = req.body;

        const tag = await Tag.build({
            name
        })

        await tag.save();

        res.status(201).send(tag);
});

export {router as createTagRouter}