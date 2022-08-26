import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';

import { Package } from '../models/package';

const router = express.Router();

router.post('/api/org/package', [], validateRequest, async (req: Request, res: Response) => {
    const { name, description, price, duration, boost_factor, max_events, perks } = req.body;

    const pkg = Package.build({
        name,
        description,
        price,
        duration,
        boost_factor,
        max_events,
        perks
    });

    await pkg.save();

    res.status(201).send(pkg);
});

export { router as createPackageRouter };