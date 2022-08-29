import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Event } from '../models/event';
import { ObjectId, ObjectIdLike } from 'bson';

export class EventCreatedListener extends Listener {
    subject = 'event:created';
    queueGroupName = 'event-created-participant';
    async onMessage(data: any, msg: Message) {
        console.log('Event Created! Data: ', data);

        data.tags.forEach((element: { id: string | ObjectId | ObjectIdLike ; }) => {
            element.id = new ObjectId(element.id);
        });



        const event = Event.build({
            _id: new ObjectId(data.id),
            name: data.name,
            organizer: data.organizer,
            start_date: data.start_date,
            end_date: data.end_date,
            description: data.description,
            type: data.type,
            tags: data.tags,
            mailList: data.mailList,
            rating: data.rating,
            parent_id: data.parent_id,
            sub_events: data.sub_events,
            banner_url: data.banner_url,
            filter: data.filter,
            ticket_price: data.ticket_price,
            privacy: data.privacy,
            zoom_link: data.zoom_link,
            location: data.location
        })

        await event.save();

        msg.ack();
    }

}