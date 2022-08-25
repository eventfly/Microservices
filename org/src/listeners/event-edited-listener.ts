import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Event } from '../models/event';
import { Tag } from '../models/tag';

export class EventEditedListener extends Listener {
    subject = 'event:edited';
    queueGroupName = 'event-edited';
    async onMessage(data: any, msg: Message) {
        console.log('Event Edited! Data: ', data);

        data.tags.forEach(async (element: {name: string | any, id: number;}) => {
            let tag = await Tag.findOne({name: element.name});
            
            if (tag) {
                element.id = tag.id;
            } else {
                throw new Error('Tag not found');
            }  
            
        });

        const event = await Event.findByIdAndUpdate(data.ref_id, data, {
            new: true,
            runValidators: true
        })
        
        msg.ack();
    }

}