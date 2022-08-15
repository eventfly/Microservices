import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Organizer } from '../models/org';
import { Password } from '../services/password';

export class StaffCreatedListener extends Listener {
    subject = 'staff:created';
    queueGroupName = 'staff-created';
    async onMessage(data: any, msg: Message) {

        let {name, email, password, role, ref_id, permissions} = data;

        password = await Password.toHash(password);

        const staff = await Organizer.build({
            name, email, password, role, ref_id, permissions
        })

        await staff.save();

        msg.ack();
    }
}