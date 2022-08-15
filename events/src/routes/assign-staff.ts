import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body, check } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { natsWrapper } from '../nats-wrapper';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { Event } from '../models/event';
import { accessControl } from '../middlewares/access-control';


const router = express.Router();

router.put('/api/event/:id/assign-staff',
    currentUser, 
    requireAuth,
    
    async (req: Request, res: Response) => {

        // let {email, name, role, profile_pic, ref_id} = req.body
        console.log(req.body)

        const event = await Event.findOneAndUpdate({"ref_id": req.params.id}, 
        {$push: 
            {"staffs": req.body}
        },
        {
            new: true,
            runValidators: true
        })


        natsWrapper.client.publish('staff:assignedToEvent', JSON.stringify(
            {
                staffs: req.body,
                eventId: event!.ref_id
            }
        ), () => {
            console.log('Staff assignment published')
        })
        
        res.status(201).send({ event })
    }
)

export { router as assignStaffRouter }