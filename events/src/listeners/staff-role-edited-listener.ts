import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Event } from '../models/event';

export class StaffRoleEditedListener extends Listener {
    subject = 'staff-role:edited2';
    queueGroupName = 'staff-role-edited2';
    
    async onMessage(data: any, msg: Message) {

        console.log(data);

        let {role, events, staffId} = data;

        events.forEach(async (event: any) => {
            
            const updatedEvent = await Event.updateOne(
                {
                    "ref_id": event.eventId,
                    "staffs.ref_id": staffId
                }, 
                {
                    $set: {
                        'staffs.$.role' : role
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