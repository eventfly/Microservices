import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Order } from '../models/order';
import { ObjectId, ObjectIdLike } from 'bson';

export class OrderCreatedListener extends Listener {
    subject = 'order:created';
    queueGroupName = 'order-created-payment';
    async onMessage(data: any, msg: Message) {
        console.log('Order added for processing! Data: ', data);

        const order = Order.build({
            _id: new ObjectId(data.id),
            user_id: new ObjectId(data.userId),
            event_id: new ObjectId(data.eventId),
            tickets: data.tickets,
            created_at: data.created_at,
            status: data.status,
            total_price: data.total_price,
            expiration_date: data.expiration_date
        });

        await order.save();
        
        msg.ack();
    }

}