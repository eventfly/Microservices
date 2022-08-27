import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { requireAuth } from '../middlewares/require-auth';
import { currentUser } from '../middlewares/current-user';
import { validateRequest } from '../middlewares/validate-request';
 
import { Organizer } from '../models/organizer';

const router = express.Router();

router.get('/api/org/:id/profile', 
currentUser, 
requireAuth, 
[], 
validateRequest, 
async (req: Request, res: Response) => {
    const orgId = req.params.id;
    const org = await Organizer.findById(orgId);

    if (!org) {
        return res.status(404).send({ message: 'Organizer not found' });
    }

    res.status(200).send({ org });
});

export { router as getOrgProfileRouter };