import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Organizer } from '../models/org';

export class StaffPermissionEditedListener extends Listener {
    subject = 'staff-permission:edited';
    queueGroupName = 'staff-permission-edited';

    async onMessage(data: any, msg: Message) {
        console.log('staff-permission Edited! Data: ', data);

        let {name, permissions, staffIds} = data

        staffIds.forEach(async (id: any) => {
            await Organizer.findOneAndUpdate({"ref_id": id}, {
                permissions: permissions
            }, 
            {
                new: true,
                runValidators: true
            })
        })

        msg.ack();
    }

}