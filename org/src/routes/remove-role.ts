import express, { Request, Response } from 'express';
import { body, check } from 'express-validator';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import { Organizer } from '../models/organizer';


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

        const organizer = await Organizer.findByIdAndUpdate(req.params.id,
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

       res.status(201).send({ existingUser: organizer })
    }
)

export { router as removeRoleRouter }