import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Feed } from '../models/feed';
import { User } from '../models/user';

export class ParticipantUpdatedListener extends Listener {
    subject = 'participant:updated';
    queueGroupName = 'participant-updated-newsfeed';

    async onMessage(data: any, msg: Message) {
        
        console.log('Participant Updated! Data: ', data);

        const user = await User.findByIdAndUpdate(data._id, {
            name: data.name,
            email: data.email,
            avatar: data.avatar
        });

        msg.ack();
    }

}