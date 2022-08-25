import express, { Request, Response } from 'express';
import { body, check } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { Staff } from '../models/staff';
import { roleControl } from '../middlewares/access-control';
import { natsWrapper } from '../nats-wrapper';


const router = express.Router();

router.put('/api/org/edit-staff-role', [
    body('name').
        isLength({ min: 3, max: 20 }).
        withMessage('Name must be between 3 and 20 characters')
    ],
     
    validateRequest,
    currentUser, 
    requireAuth,
    roleControl('Organizer', 'Manager'),

    async (req: Request, res: Response) => {

        let {role, permissions, staffId} = req.body;

        const staff = await Staff.findByIdAndUpdate(staffId, 
            {$set: 
                {   "role": role,
                    "permissions": permissions
                }
            }, 
            {
                new: true,
                runValidators: true
            }
       )

       natsWrapper.client.publish('staff-role:edited', JSON.stringify(
            {
                staffId: staff!.id,
                role: role, 
                permissions: permissions 
            }
        ));

        natsWrapper.client.publish('staff-role:edited2', JSON.stringify(
            {
                role: role,
                events: staff!.events,
                staffId: staff!.id, 
            }
        ));

       res.status(201).send({ "message": 'Staff role changed successfully' })
    }
)

export { router as editStaffRoleRouter }