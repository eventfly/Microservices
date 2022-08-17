import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { User } from '../models/user';
import { Event } from '../models/event';
import { ObjectId} from 'bson';

export class StaffAssignedListener extends Listener {
    subject = 'staff:assignedToEvent';
    queueGroupName = 'staff-assignedToEvent-newsfeed';

    async onMessage(data: any, msg: Message) {
        console.log('Staff assigned! Data: ', data);

        let {staffs, eventId} = data

        staffs.forEach(async (staff: any) => {

            const user = User.build({
                _id : staff.ref_id,
                roles: ['Staff'],
                email: staff.email,
                avatar: staff.profile_pic,
                name: staff.name
            });

            await user.save();

            const event = await Event.findOneAndUpdate(
                {
                    _id: eventId
                },
                {
                    $push: {
                        staffs: new ObjectId(user._id)
                    }
                },
                {
                    new: true,
                    runValidators: true
                });
            

        });
        
        msg.ack();
    }

}