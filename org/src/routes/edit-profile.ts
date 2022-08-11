import express, { Request, Response } from 'express';
import { body, check } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { natsWrapper } from '../nats-wrapper';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { Staff } from '../models/staff';
import { Organizer } from '../models/organizer';
import { BadRequestError } from '../errors/bad-request-error';


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
    ], validateRequest,
    currentUser, requireAuth,
    async (req: Request, res: Response) => {

        console.log(req.body)
        const { email, name, role, profile_pic } = req.body;
        let existingUser = {}

        if(role == 'Organizer'){
            existingUser = await Organizer.findOne({ email })

            if (!existingUser) {
                throw new BadRequestError('Organizer doesn\'t exist')
            } 
            
            else{
                existingUser = await Organizer.findOneAndUpdate({"email": email}, req.body, {
                    new: true,
                    runValidators: true
                })

                natsWrapper.client.publish('profile:edited', JSON.stringify(
                    {
                        name: existingUser!.name,
                        ref_id: existingUser.id
                    }
                ), () => {
                    console.log('Edited Profile published')
                })
                
                res.status(201).send({ existingUser })
            }
        }


        else{
            existingUser = await Staff.findOne({ email })

            if (!existingUser) {
                throw new BadRequestError('Staff doesn\'t exist')
            } 

            else{
                existingUser = await Staff.findOneAndUpdate({"email": email}, req.body, {
                    new: true,
                    runValidators: true
                })

                natsWrapper.client.publish('profile:edited', JSON.stringify(
                    {
                        name: existingUser.name,
                        ref_id: existingUser.id
                    }
                ), () => {
                    console.log('Edited Profile published')
                })
                
                res.status(201).send({ existingUser })
            }
        }
    }
)

export { router as editProfileRouter }