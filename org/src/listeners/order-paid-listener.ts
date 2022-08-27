import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Event } from '../models/event';
import { ObjectId, ObjectIdLike } from 'bson';
import { Order } from '../models/order';
import { natsWrapper } from '../nats-wrapper';
import { Organizer } from '../models/organizer';

export class OrderPaidListener extends Listener {
    subject = 'order:paid:org';
    queueGroupName = 'order-paid-org';
    async onMessage(data: any, msg: Message) {
        console.log('Order paid! Data: ', data);
        
        const order = await Order.findById(data.order_id).populate('package_id');
        order.status = 'paid';
        order.transaction_id = data.payment.stripe_id
        await order.save();

        const organizer = await Organizer.findById(order.organizer_id);
        organizer.current_package = order.package_id;
        organizer.orders.push(order._id);

        await organizer.save();

        msg.ack();


        natsWrapper.client.publish('org:subscription:added', JSON.stringify({
            org_id: order.organizer_id,
            package_name: order.package_id.name,
            boost_factor: order.package_id.boost_factor
        }));

    }

}