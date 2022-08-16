import express, { Request, Response } from 'express';
import { body, check } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { natsWrapper } from '../nats-wrapper';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { Staff } from '../models/staff';
import { Organizer } from '../models/organizer';
import { BadRequestError } from '../errors/bad-request-error';
import { roleControl } from '../middlewares/access-control';


const router = express.Router();

router.put('/api/org/edit-profile', [
    body('email').
    isEmail().
    withMessage('Email must be valid'),
    body('name').
        isLength({ min: 5, max: 50 }).
        withMessage('Name must be between 5 and 50 characters'),
    // body('profile_pic').
    //     isURL().
    //     withMessage('Profile picture must be a valid URL'),
    ], 
    
    validateRequest,
    currentUser, 
    requireAuth,
    roleControl('Organizer', 'Manager'),
    
    async (req: Request, res: Response) => {

        console.log(req.body)
        const { email, name, role, profile_pic } = req.body;

        let Model : any;
        if (role === 'Organizer') {
            Model = Organizer;
        } else {
            Model = Staff;
        }
        
        const existingUser = await Model.findOne({ email })

        if (!existingUser) {
            throw new BadRequestError(`${role} doesn\'t exist`)
        } 
        
        else{
            const existingUser = await Model.findOneAndUpdate({"email": email}, req.body, {
                new: true,
                runValidators: true
            })

            natsWrapper.client.publish('profile:edited', JSON.stringify(
                {
                    name: existingUser!.name,
                    ref_id: existingUser!.id
                }
            ), () => {
                console.log('Edited Profile published to auth')
            })

            if(role != 'Organizer'){
                natsWrapper.client.publish('staffProfile:edited', JSON.stringify(
                    {
                        name: existingUser!.name,
                        profile_pic: existingUser!.profile_pic,
                        events: existingUser!.events,
                        staffId: existingUser!.id
                    }
                ), () => {
                    console.log('Edited Profile published to event')
                })
            }
            
            res.status(201).send({ existingUser })
        }
    }
)

export { router as editProfileRouter }