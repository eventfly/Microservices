import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { User } from '../models/user';

export class ParticipantCreatedListener extends Listener {
    subject = 'participant:created';
    queueGroupName = 'participant-created2';

    async onMessage(data: any, msg: Message) {
        
        console.log('Participant Created! Data: ', data);

        const user = new User({
            _id: data._id,
            email: data.email,
            name: data.name,
            dateOfBirth: data.dob,
            gender: data.gender,
            role: data.role || 'Participant',
        })

        await user.save();
        
        msg.ack();
    }

}