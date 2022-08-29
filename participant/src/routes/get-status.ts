import express, { Request, Response } from 'express';

import { currentUser } from '../middlewares/current-user';
import { errorHandler } from '../middlewares/error-handler';
import { requireAuth } from '../middlewares/require-auth';
import { Participant } from '../models/participant';
import { Event } from '../models/event';

import { ObjectID } from 'bson';

const router = express.Router();

router.get('/api/participant/event/:id/status', 
    currentUser, 
    requireAuth, 
    errorHandler, 
    async (req: Request, res: Response) => {
        const { id } = req.params;

        const participant = await Participant.findById(
            req.currentUser!.ref_id,
        );

        if (!participant) {
            throw new Error('Participant not found');
        }

        const event = await Event.findById(id);

        if (!event) {
            throw new Error('Event not found');
        }

        //find if the event is in the participant's events array
        
        var eventInParticipant = participant.events.find((event:any) => {
            return event.toString() === id;
        });

        return res.status(200).send({isRegistered: eventInParticipant === undefined ? false : true});


        
});

export { router as getStatusRouter };