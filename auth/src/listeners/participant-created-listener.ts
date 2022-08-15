import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { participant } from '../models/participant';

export class ParticipantCreatedListener extends Listener {
    subject = 'participant:created';
    queueGroupName = 'participant-created1';

    async onMessage(data: any, msg: Message) {
        
        console.log('Participant Created! Data: ', data);

        const user = participant.build({
            ref_id: data._id,
            email: data.email,
            name: data.name,
            dob: data.dob,
            gender: data.gender,
            password: data.password
        });

        await user.save();
        
        msg.ack();
    }

}