import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Event } from '../models/event';

export class RoleRemovedListener extends Listener {
    subject = 'role:removed';
    queueGroupName = 'role-removed';
    
    async onMessage(data: any, msg: Message) {

        console.log("role-removed: ", data);

        let {role, newRole, staffIds} = data;

        await Event.updateMany(
            {
                "roles.name": role
            }, 
            {$pull: 
                {
                    roles: {
                        name: role
                    }
                }  
            },  
            {
                new: true,
                runValidators: true
            }
        )

        staffIds.forEach(async (id: any)=>{
            await Event.updateMany(
            {
                "staffs.ref_id": id
            }, 
            {$set: 
                {
                    "staffs.$.role": newRole
                }
            }, 
            {
                new: true,
                runValidators: true
            }
           )
        })

        msg.ack();
    }
}