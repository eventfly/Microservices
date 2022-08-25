import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Event } from '../models/event';
import { ObjectId, ObjectIdLike } from 'bson';

export class EventCreatedListener extends Listener {
    subject = 'event:created';
    queueGroupName = 'event-created-event-analytics';

    async onMessage(data: any, msg: Message) {
        console.log('Event Created! Data: ', data);

        data.tags.forEach((element: { id: string | ObjectId | ObjectIdLike ; }) => {
            element.id = new ObjectId(element.id);
        });


        const event = new Event({
            _id: data._id,
            name: data.name,
            organizer: data.organizer,
            start_date: data.start_date,
            end_date: data.end_date,
            description: data.description,
            type: data.type,
            tags: data.tags,
            rating: data.rating,
            ticket_price: data.ticket_price,
            privacy: data.privacy,
            location: data.location
        })

        await event.save();

        msg.ack();
    }

}