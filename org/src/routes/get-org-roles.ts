import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { validateRequest } from '../middlewares/validate-request';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { Organizer } from '../models/organizer';
import { errorHandler } from '../middlewares/error-handler';
import { ObjectId } from 'bson';

const router = express.Router();

router.get('/api/org/:orgId/roles', 
currentUser, requireAuth,
 errorHandler, async (req: Request, res: Response) => {

    const existingUser = await Organizer.findById(req.params.orgId);
    res.status(201).send({ 
        roles: existingUser!.roles
    })
})

export { router as getOrgRolesRouter };