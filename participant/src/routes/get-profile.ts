import express, { Request, Response } from 'express';

import { body } from 'express-validator';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import { Participant } from '../models/participant';


const router = express.Router();

router.get('/api/participant/:id/profile', [], currentUser, requireAuth, validateRequest, async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await Participant.findById(id);

    if (!user) {
        throw new Error('User not found');
    }

    res.status(200).send(user);
}
);

export { router as getProfileRouter };