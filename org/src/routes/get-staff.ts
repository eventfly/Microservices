import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { validateRequest } from '../middlewares/validate-request';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { Staff } from '../models/staff';
import { errorHandler } from '../middlewares/error-handler';
import { ObjectId } from 'bson';

const router = express.Router();

router.get('/api/org/:staffId', 
currentUser, requireAuth,
 errorHandler, async (req: Request, res: Response) => {
    const { staffId } = req.params;
    console.log("staffid", staffId)

    const existingUser = await Staff.findById(staffId);
    console.log(existingUser)
    res.status(201).send({ existingUser })
})

export { router as getStaffRouter };