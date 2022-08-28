import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { User } from '../models/user';
import { Event } from '../models/event';
import { ObjectId} from 'bson';

export class OrgCreatedListener extends Listener {
    subject = 'org:created';
    queueGroupName = 'org-created-newsfeed';

    async onMessage(data: any, msg: Message) {
        console.log('User added! Data: ', data);

        const { email, name, role, permissions, ref_id } = data;

        const user = new User({
            _id: new ObjectId(data.ref_id),
            email: data.email,
            name: data.name,
            dateOfBirth: data.dob,
            gender: data.gender,
            role: data.role,
        });

        await user.save();

        
        msg.ack();
    }

}

//org-edited-listener needed maybe?