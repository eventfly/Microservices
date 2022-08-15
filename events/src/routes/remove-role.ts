import express, { Request, Response } from 'express';
import { body, check } from 'express-validator';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import { Event } from '../models/event';


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

        const event = await Event.findOneAndUpdate(
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

       res.status(201).send({ event })
    }
)

export { router as removeRoleRouter }