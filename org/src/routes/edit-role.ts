import express, { Request, Response } from 'express';
import { body, check } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { Organizer } from '../models/organizer';
import { accessControl } from '../middlewares/access-control';
import { natsWrapper } from '../nats-wrapper';


const router = express.Router();

router.put('/api/org/:id/role', [
    body('name').
        isLength({ min: 3, max: 20 }).
        withMessage('Name must be between 3 and 20 characters')
    ],
     
    validateRequest,
    currentUser, 
    requireAuth,

    async (req: Request, res: Response) => {

        let {name, permissions, staffIds} = req.body;

        const organizer = await Organizer.findOneAndUpdate(
            {
                "_id": req.params.id,
                "roles.name": name
            }, 
            {$set: 
                {
                    "roles.$.permissions": permissions
                }
            }, 
            {
                new: true,
                runValidators: true
            }
       )

       natsWrapper.client.publish('permission:edited', JSON.stringify(
            {
                name: name, 
                permissions: permissions 
            }
        ));

        natsWrapper.client.publish('staff-permission:edited', JSON.stringify(
            {
                name: name, 
                permissions: permissions,
                staffIds: staffIds 
            }
        ));

       res.status(201).send({ existingUser: organizer })
    }
)

export { router as editRoleRouter }