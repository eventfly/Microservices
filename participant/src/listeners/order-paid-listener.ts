import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Event } from '../models/event';
import { ObjectId, ObjectIdLike } from 'bson';
import { Order } from '../models/order';

export class OrderPaidListener extends Listener {
    subject = 'order:paid';
    queueGroupName = 'order-paid-participant';
    async onMessage(data: any, msg: Message) {
        console.log('Ordered paid! Data: ', data);
        
        const {order_id, payment} = data;

        const order = await Order.findById(order_id);
        order.status = 'paid';
        await order.save();

        //TODO: Add a Ticket to the participant's account
        
        
        msg.ack();
    }

}