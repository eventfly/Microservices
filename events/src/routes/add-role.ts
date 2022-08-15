import express, { Request, Response } from 'express';
import { body, check } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { Event } from '../models/event';


const router = express.Router();

router.post('/api/event/:id/role', [
    body('name').
        isLength({ min: 3, max: 20 }).
        withMessage('Name must be between 3 and 20 characters')
    ], 
    validateRequest,
    currentUser, 
    requireAuth,

    async (req: Request, res: Response) => {

        let {name, permissions} = req.body;

        const event = await Event.findOneAndUpdate(
            {
                "ref_id": req.params.id
            }, 
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

       res.status(201).send({ event })
    }
)

export { router as addRoleRouter }