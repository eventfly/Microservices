import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Staff } from '../models/staff';

export class StaffAssignedListener extends Listener {
    subject = 'staff:assignedToEvent';
    queueGroupName = 'staff-assignedToEvent';

    async onMessage(data: any, msg: Message) {
        console.log('Staff assigned! Data: ', data);

        let {staffId, eventId} = data

        await Staff.findByIdAndUpdate(staffId, 
        {
            $push: 
            {"events": 
                {
                    eventId
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