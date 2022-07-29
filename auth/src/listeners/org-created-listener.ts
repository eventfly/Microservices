import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Organizer } from '../models/org';

export class OrgCreatedListener extends Listener {
    subject = 'org:created';
    queueGroupName = 'org-created';
    async onMessage(data: any, msg: Message) {
        console.log('Organization Created! Data: ', data);

        const org = await Organizer.build({
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
            ref_id: data.id
        })

        await org.save();

        msg.ack();
    }

}