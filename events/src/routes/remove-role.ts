import express, { Request, Response } from 'express';
import { body, check } from 'express-validator';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import { Event } from '../models/event';
import { natsWrapper } from '../nats-wrapper';


const router = express.Router();

router.delete('/api/event/:id/role', [
    body('name').
        isLength({ min: 3, max: 20 }).
        withMessage('Name must be between 3 and 20 characters')
    ],
    validateRequest,
    currentUser, 
    requireAuth,

    async (req: Request, res: Response) => {

        await Event.findOneAndUpdate(
            {
                "ref_id": req.params.id
            }, 
            {$pull: 
                {
                    roles: {
                        name: req.body.name
                    }
                }
            }, 
            {
                new: true,
                runValidators: true
            }
       )


       const event = await Event.findOneAndUpdate(
        {
            "ref_id": req.params.id
        }, 
        {$pull: 
            {
                staffs: {
                    ref_id: {
                        $in: req.body.staffIds
                    }
                }
            }
        }, 
        {
            new: true,
            runValidators: true
        }
   )


   natsWrapper.client.publish('event-role:removed', JSON.stringify(
    {
        eventId: req.params.id, 
        staffIds: req.body.staffIds
    }
    ), () => {
        console.log('Removal of event role published')
    })

       res.status(201).send({ event })
    }
)

export { router as removeRoleRouter }