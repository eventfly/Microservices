import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Event } from '../models/event';
import { User } from '../models/user';

export class StaffProfileEditedListener extends Listener {
    subject = 'staffProfile:edited';
    queueGroupName = 'staffProfile-edited';
    
    async onMessage(data: any, msg: Message) {

        console.log(data);

        let {name, profile_pic, events, staffId} = data;

        events.forEach(async (event: any) => {
            
            
            const user = await User.findOneAndUpdate({
                _id: staffId,
                role: 'Staff'
            }, {
                name,
                avatar: profile_pic
            }, {
                new: true,
                runValidators: true
            });

        
            
        })

        msg.ack();
    }
}