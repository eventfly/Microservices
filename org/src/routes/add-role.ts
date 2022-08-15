import express, { Request, Response } from 'express';
import { body, check } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { Organizer } from '../models/organizer';
import { accessControl } from '../middlewares/access-control';


const router = express.Router();

router.post('/api/org/:id/role', [
    body('name').
        isLength({ min: 3, max: 20 }).
        withMessage('Name must be between 3 and 20 characters')
    ], 
    validateRequest,
    currentUser, 
    requireAuth,
    accessControl('Organizer', 'Manager'),

    async (req: Request, res: Response) => {

        let {name, permissions} = req.body;

        const organizer = await Organizer.findByIdAndUpdate(req.params.id, 
            {$push: 
                {"roles": 
                    {
                        "name": name,
                        "permissions": permissions
                    }
                }
            }, 
            {
                new: true,
                runValidators: true
            }
       )

       res.status(201).send({ existingUser: organizer })
    }
)

export { router as addRoleRouter }