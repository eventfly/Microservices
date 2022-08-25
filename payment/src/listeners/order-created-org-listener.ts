import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { OrgOrder } from '../models/order-org';
import { ObjectId, ObjectIdLike } from 'bson';

export class OrderCreatedOrgListener extends Listener {
    subject = 'order:created:org';
    queueGroupName = 'order-created-org-payment';
    async onMessage(data: any, msg: Message) {
        console.log('Order added for processing! Data: ', data);

        const order = OrgOrder.build({
            id: data._id,
            organizer: data.organizer_id,
            package_id: data.package_id,
            expiration_date: data.expiration_date,
            created_at: data.created_at,
            total_price: data.total_price,
            status: data.status
        });

        await order.save();
        
        msg.ack();
    }

}