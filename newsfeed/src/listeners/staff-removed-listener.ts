import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { User } from '../models/user';
import { Event } from '../models/event';
import { ObjectId} from 'bson';

export class StaffRemovedListener extends Listener {
    subject = 'staff:removed';
    queueGroupName = 'staff-removed-newsfeed';

    async onMessage(data: any, msg: Message) {
        console.log('Staff removed from newsfeed! Data: ', data);

        let {ref_id, eventId} = data

        await User.deleteOne({_id: ref_id})

        const event = await Event.findOneAndUpdate(
            {
                _id: eventId
            },
            {
                $pull: {
                    staffs: new ObjectId(ref_id),
                    followers: new ObjectId(ref_id)
                }
            },
            {
                new: true,
                runValidators: true
            });

        
        msg.ack();
    }

}