import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Feed } from '../models/feed';
import { User } from '../models/user';

export class ParticipantUpdatedListener extends Listener {
    subject = 'participant:updated';
    queueGroupName = 'participant-updated-newsfeed';

    async onMessage(data: any, msg: Message) {
        
        console.log('Participant Updated! Data: ', data);

        const user = await User.findByIdAndUpdate(data.user._id, {
            name: data.user.name,
            email: data.user.email,
            avatar: data.user.avatar
        }, {
            new: true,
            runValidators: true
        });

        console.log(user)

        msg.ack();
    }

}