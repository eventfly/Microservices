import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Organizer } from '../models/org';

export class StaffCreatedListener extends Listener {
    subject = 'staff:created';
    queueGroupName = 'staff-created';
    async onMessage(data: any, msg: Message) {
        console.log('Staff Created! Data: ', data);

        const staff = await Organizer.build({
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
            ref_id: data.id
        })

        await staff.save();

        msg.ack();
    }
}