import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { User } from '../models/user';
import { Feed } from '../models/feed';
import { Password } from '../services/password';
import { Event } from '../models/event';

export class ManagerCreatedListener extends Listener {
    subject = 'manager:created';
    queueGroupName = 'manager-created-newsfeed';
    async onMessage(data: any, msg: Message) {

        console.log('Manager created! Data: ', data);

        let {name, email, password, role, ref_id, permissions} = data;

        const user = new User({
            _id: ref_id,
            email: email,
            name: name,
            role: 'Manager',
        })

        await user.save();

        var feed = await Feed.findOne({
            user_id: user._id
        });
        
        if (!feed) {
            feed = Feed.build({
                user_id: user._id
            });

            await feed.save();
        }

        msg.ack();
    }
}