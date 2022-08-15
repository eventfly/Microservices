import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Organizer } from '../models/org';

export class StaffRemovedListener extends Listener {
    subject = 'org-staff:removed';
    queueGroupName = 'org-staff-removed';

    async onMessage(data: any, msg: Message) {

        console.log("Data:", data)
        let {ref_id} = data;

        await Organizer.deleteOne({"ref_id": ref_id})
        
        msg.ack();
    }
}