import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Staff } from '../models/staff';

export class EventRoleRemovedListener extends Listener {
    subject = 'event-role:removed';
    queueGroupName = 'event-role-removed';
    async onMessage(data: any, msg: Message) {
        console.log('Event Role Removed! Data: ', data);

        let {eventId, staffIds} = data

        staffIds.forEach(async (id: any) => {

            await Staff.findByIdAndUpdate(id, {
                $pull: {
                    events: {
                      eventId: eventId
                    }
                  }
            }, 
            {
                new: true,
                runValidators: true
            })
        });
        
        msg.ack();
    }

}