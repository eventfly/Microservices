import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Event } from '../models/event';

export class RolePermissionEditedListener extends Listener {
    subject = 'permission:edited';
    queueGroupName = 'permission-edited';
    
    async onMessage(data: any, msg: Message) {

        console.log("permission-edited: ", data);

        let {name, permissions} = data;

        // const events = await Event.find({"roles.name": name})

        await Event.updateMany(
            {
                "roles.name": name
            }, 
            {$set: 
                {
                    "roles.$.permissions": permissions
                }
            }, 
            {
                new: true,
                runValidators: true
            }
       )

        msg.ack();
    }
}