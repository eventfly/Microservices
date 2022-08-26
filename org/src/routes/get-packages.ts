import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';

import { Package } from '../models/package';

const router = express.Router();

router.get('/api/org/package', [],
currentUser, 
requireAuth, 

async (req: Request, res: Response) => {

    const packages = await Package.find({})

    res.status(201).send({packages});
});

export { router as getPackagesRouter };