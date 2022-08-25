import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Event } from '../models/event';

export class StaffRemovedListener extends Listener {
    subject = 'org-staff:removed2';
    queueGroupName = 'org-staff-removed2';

    async onMessage(data: any, msg: Message) {

        console.log("org-staff-removed, Data:", data)
        let {organizer, staffId} = data;

        const events = await Event.find({"organizer": organizer})

        events.forEach(async (event: any) => {
            
            await Event.findByIdAndUpdate(event._id, 
                {
                    $pull: {
                      staffs: {
                        ref_id: staffId
                      }
                    }
                }, 
                {
                    new: true,
                    runValidators: true
                })

        })

        msg.ack();
    }
}