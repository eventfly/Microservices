import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Organizer } from '../models/org';

export class ProfileEditedListener extends Listener {
    subject = 'profile:edited';
    queueGroupName = 'profile-edited';

    async onMessage(data: any, msg: Message) {
        console.log('Profile Edited! Data: ', data);

        const organizer = await Organizer.findByIdAndUpdate(data.ref_id, data, {
            new: true,
            runValidators: true
        })
        
        msg.ack();
    }

}