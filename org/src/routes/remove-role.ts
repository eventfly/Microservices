import express, { Request, Response } from 'express';
import { body, check } from 'express-validator';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import { Organizer } from '../models/organizer';
import { Staff } from '../models/staff';
import { natsWrapper } from '../nats-wrapper';


const router = express.Router();

router.delete('/api/org/:id/role', [
    body('name').
        isLength({ min: 3, max: 20 }).
        withMessage('Name must be between 3 and 20 characters')
    ],
    validateRequest,
    currentUser, 
    requireAuth,

    async (req: Request, res: Response) => {

        let {name, staffIds} = req.body;

        const organizer = await Organizer.findByIdAndUpdate(req.params.id,
            {$pull: 
                {
                    roles: {
                        name: name
                    }
                }
            }, 
            {
                new: true,
                runValidators: true
            }
       )

       staffIds.forEach(async (id: any) => {
            await Staff.findByIdAndUpdate(id, {
                role: 'Default'
            }, 
            {
                new: true,
                runValidators: true
            })
        })

       natsWrapper.client.publish('role:removed', JSON.stringify(
        {
            role: name, 
            newRole: 'Default',
            staffIds: staffIds 
        }
    ));

       res.status(201).send({ existingUser: organizer })
    }
)

export { router as removeRoleRouter }