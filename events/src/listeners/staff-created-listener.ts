import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Event } from '../models/event';

export class StaffCreatedListener extends Listener {
    subject = 'staff:created';
    queueGroupName = 'staff-created';
    async onMessage(data: any, msg: Message) {

        console.log(data);

        let {name, email, password, role, events, ref_id} = data;

        events.forEach(async (event: any) => {
            
            const updatedEvent = await Event.updateOne(
                {ref_id: event.eventId}, 
                {$push: 
                    {staffs: 
                        {name, email, otp:password, role, ref_id}
                    }
                }, 
                 {
                    new: true,
                    runValidators: true
                }
                ).exec();
            console.log(updatedEvent);
        })

        msg.ack();
    }
}