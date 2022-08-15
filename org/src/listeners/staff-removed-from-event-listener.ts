import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Staff } from '../models/staff';

export class StaffRemovedFromEventListener extends Listener {
    subject = 'staff:removed';
    queueGroupName = 'staff-removed';
    async onMessage(data: any, msg: Message) {
        console.log('Staff removed! Data: ', data);

        const event = await Staff.findByIdAndUpdate(data.ref_id, {
            $pull: {
                events: {
                  eventId: data.eventId
                }
              }
        }, 
        {
            new: true,
            runValidators: true
        })
        
        msg.ack();
    }

}