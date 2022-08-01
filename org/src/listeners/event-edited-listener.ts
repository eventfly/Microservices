import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Event } from '../models/event';

export class EventEditedListener extends Listener {
    subject = 'event:edited';
    queueGroupName = 'event-edited';
    async onMessage(data: any, msg: Message) {
        console.log('Event Edited! Data: ', data);

        const event = await Event.findOneAndUpdate({"organizer": data.organizer}, data, {
            new: true,
            runValidators: true
        })
        
        msg.ack();
    }

}