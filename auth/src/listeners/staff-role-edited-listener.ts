import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Organizer } from '../models/org';

export class StaffRoleEditedListener extends Listener {
    subject = 'staff-role:edited';
    queueGroupName = 'staff-role-edited';

    async onMessage(data: any, msg: Message) {
        console.log('staff-role Edited! Data: ', data);

        let {staffId, role, permissions} = data

        await Organizer.findOneAndUpdate({"ref_id": staffId}, {
            role: role,
            permissions: permissions
        }, 
        {
            new: true,
            runValidators: true
        })

        msg.ack();
    }

}