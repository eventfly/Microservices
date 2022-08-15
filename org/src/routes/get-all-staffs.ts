import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { validateRequest } from '../middlewares/validate-request';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { Staff } from '../models/staff';
import { errorHandler } from '../middlewares/error-handler';
import { ObjectId } from 'bson';

const router = express.Router();

router.get('/api/org/:orgId/staffs', 
currentUser, requireAuth,
 errorHandler, async (req: Request, res: Response) => {

    const staffs = await Staff.find({"organizer": req.params.orgId});
    res.status(201).send({ staffs })
})

export { router as getAllStaffsRouter };