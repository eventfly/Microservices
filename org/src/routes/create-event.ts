import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body, check } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { natsWrapper } from '../nats-wrapper';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { Event } from '../models/event';
import {Tag} from '../models/tag';
import {ObjectId} from 'bson';



const router = express.Router();

router.post('/api/org/event', [
    body('name').
        isLength({ min: 5, max: 50 }).
        withMessage('Name must be between 5 and 50 characters'),
    body('desc').
        isLength({ min: 5, max: 500 }).
        withMessage('Description must be between 5 and 500 characters'),
    body('start').
        isISO8601().
        withMessage('Start date must be a valid date'),
    body('end').
        isISO8601().
        withMessage('End date must be a valid date'),
    body('banner_url').
        isURL().
        withMessage('Banner URL must be a valid URL'),
    check('end').custom((value, { req }) => {
        if (new Date(value) <= new Date(req.body.start)) {
            throw new Error('End date must be valid and after start date');
        }
        return true;
    })
], validateRequest,
    currentUser, requireAuth,
    async (req: Request, res: Response) => {
        const { name, desc, start, end, banner_url, type, privacy, ticket, mailList, filter, tags } = req.body
        
        // Find the corresponding tag element from database and add it to the event
        tags.forEach(async (element: {name: string | any, id: number;}) => {
            let tag = await Tag.findOne({name: element.name});
            
            if (tag) {
                element.id = tag.id;
            } else {
                throw new Error('Tag not found');
            }  
            
        });

        //
        const event = Event.build({
            name,
            description: desc,
            start_date: start,
            end_date: end,
            banner_url,
            type,
            privacy,
            ticket_price: ticket,
            mailList,
            filter,
            tags,
            organizer: new ObjectId(req.currentUser!.ref_id),
        })

        // Save the event to the database
        await event.save()

        // Publish an event to the NATS Streaming server

        natsWrapper.client.publish('event:created', JSON.stringify(
            event
        ), () => {
            console.log('Event published')
        })
        //
        res.status(201).send({ event })
    }
)

export { router as createEventRouter }