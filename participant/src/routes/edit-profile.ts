import express, { Request, Response } from 'express';

import { body } from 'express-validator';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import { Participant } from '../models/participant';

const router = express.Router();

router.put('/api/participant/:id/edit', [
], validateRequest, 
    currentUser, 
    requireAuth, 
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, email, password, avatar } = req.body;
        const user = await Participant.findById(id);
        
        if (!user) {
            throw new Error('User not found');
        }

        if (!(req.currentUser!.ref_id === id)) {
            throw new Error('Not authorized');
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;
        if (avatar) user.avatar = avatar;

        user.updatedAt = new Date();
        await user.save();

        res.status(200).send(user);
    }
);

export { router as editProfileRouter };