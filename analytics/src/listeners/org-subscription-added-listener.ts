import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { ObjectId, ObjectIdLike } from 'bson';
import { Organizer } from '../models/organizer';


export class OrgSubscriptionAddedListener extends Listener {
    subject = 'org:subscription:added';
    queueGroupName = 'org-subscription-added-analytics';

    async onMessage(data: any, msg: Message) {
        console.log('org subscription added! Data: ', data);

        const {org_id, package_name, boost_factor} = data;

        const org = await Organizer.findOne({_id: org_id})

        if(!org){
            const newOrg = new Organizer({
                _id: org_id,
                package: package_name,
                boost_factor: boost_factor
            })

            await newOrg.save()
        }
        else{
            org.package = package_name
            org.boost_factor = boost_factor
            await org.save()
        }
        
        msg.ack();

    }

}