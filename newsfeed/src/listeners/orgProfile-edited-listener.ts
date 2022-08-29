import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Event } from '../models/event';
import { User } from '../models/user';

export class OrgProfileEditedListener extends Listener {
    subject = 'profile:edited';
    queueGroupName = 'profile-edited-newsfeed';
    
    async onMessage(data: any, msg: Message) {

        console.log(data);

        let {name, ref_id, profile_pic} = data;
            
            
        const user = await User.findOneAndUpdate({
            _id: ref_id
        }, {
            name,
            avatar: profile_pic
        }, {
            new: true,
            runValidators: true
        });

        console.log(user)
        
            
        // })

        msg.ack();
    }
}