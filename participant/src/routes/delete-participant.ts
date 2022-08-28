import express, { Request, Response } from 'express';

import { Participant } from '../models/participant';

import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.delete('/api/participant', 
    currentUser, 
    requireAuth, 
    async (req: Request, res: Response) => {
    const id  = req.currentUser!.ref_id;
    const participant = await Participant.findByIdAndDelete(id);

    if (!participant) {
        throw new Error('Participant not found');
    }

    natsWrapper.client.publish('participant:deleted', JSON.stringify({
        id: participant._id
    }));

    res.status(200).send({message: "Participant deleted"});
});

export { router as deleteParticipantRouter };