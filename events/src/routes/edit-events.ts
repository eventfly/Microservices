import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body, check } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { natsWrapper } from '../nats-wrapper';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { Event } from '../models/event';


const router = express.Router();

router.put('/api/event/:id', [
    body('name').
        isLength({ min: 5, max: 50 }).
        withMessage('Name must be between 5 and 50 characters'),
    body('description').
        isLength({ min: 5, max: 500 }).
        withMessage('Description must be between 5 and 500 characters'),
    body('start_date').
        isISO8601().
        withMessage('Start date must be a valid date'),
    body('end_date').
        isISO8601().
        withMessage('End date must be a valid date'),
    body('banner_url').
        isURL().
        withMessage('Banner URL must be a valid URL'),
    check('end_date').custom((value, {req}) => {
        if (new Date(value) <= new Date(req.body.start)) {
            throw new Error('End date must be valid and after start date');
        }
        return true;
    })
], validateRequest,
    currentUser, requireAuth,
    async (req: Request, res: Response) => {

        const event = await Event.findOneAndUpdate({"ref_id": req.params.id}, req.body, {
            new: true,
            runValidators: true
        })

        // Publish the edited event to the NATS Streaming server

        natsWrapper.client.publish('event:edited', JSON.stringify(
            event
        ), () => {
            console.log('Edited Event published')
        })
        
        res.status(201).send({ event })
    }
)

export { router as editEventRouter }