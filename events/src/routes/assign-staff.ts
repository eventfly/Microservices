import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body, check } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { natsWrapper } from '../nats-wrapper';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { Event } from '../models/event';
import { roleControl, permissionControl } from '../middlewares/access-control';
import { sendMail } from '../services/mail';
var URI = require("uri-js");


const router = express.Router();

router.put('/api/event/:id/assign-staff',
    currentUser, 
    requireAuth,
    permissionControl('Admin', 'Edit Role'),
    
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

        let staffs = req.body

        staffs.forEach((staff: any) => {
           
            const url = encodeURIComponent(`http://localhost:3005/event/${req.params.id}/profile`)
            console.log(url);
    
            sendMail({
                from: 'eventfly@buetcsefest2022.com',
                to: staff.email,
                subject: 'Welcome to Eventfly',
                html: `<h1>Welcome to Eventfly!</h1> <p>You are assigned to our event. <a href=${url}>Visit Event Page</a></p>`
            });

        });
        
        res.status(201).send({ event })
    }
)

export { router as assignStaffRouter }