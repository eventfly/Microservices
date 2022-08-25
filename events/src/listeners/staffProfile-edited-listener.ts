import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Event } from '../models/event';

export class StaffProfileEditedListener extends Listener {
    subject = 'staffProfile:edited';
    queueGroupName = 'staffProfile-edited';
    
    async onMessage(data: any, msg: Message) {

        console.log(data);

        let {name, profile_pic, events, staffId} = data;

        events.forEach(async (event: any) => {
            
            const updatedEvent = await Event.updateOne(
                {
                    "ref_id": event.eventId,
                    "staffs.ref_id": staffId
                }, 
                {
                    $set: {
                        'staffs.$.name' : name, 
                        'staffs.$.profile_pic' : profile_pic
                    } 
                }, 
                 {
                    new: true,
                    runValidators: true
                }
                );
            
            console.log(updatedEvent);
        })

        msg.ack();
    }
}