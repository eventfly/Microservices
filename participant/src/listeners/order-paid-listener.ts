import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Event } from '../models/event';
import { ObjectId, ObjectIdLike } from 'bson';
import { Order } from '../models/order';
import { Ticket } from '../models/ticket';
import { Participant } from '../models/participant';
import { natsWrapper } from '../nats-wrapper';

export class OrderPaidListener extends Listener {
    subject = 'order:paid';
    queueGroupName = 'order-paid-participant';
    async onMessage(data: any, msg: Message) {
        console.log('Order paid! Data: ', data);
        
        const {order_id, payment} = data;

        const order = await Order.findById(order_id);

        if (!order) {
            throw new Error('Order not found');
        }

        order.status = 'paid';
        await order.save();

        //TODO: Add a Ticket to the participant's account
        const event = await Event.findById(order.event_id);
        let tickets = [];

        if (!event) {
            throw new Error('Event not found');
        }

        const participant = await Participant.findById(order.user_id);

        if (!participant) {
            throw new Error('Participant not found');
        }

        participant.events.push(
            event._id
        );

        await participant.save();

        let tokens: { type: any; id: number; }[] = [];

        order.tickets.forEach(async (ticket: any) => {
            
            const tkt_class = event!.tickets!.find((t: any) => t.class === ticket.class);
            
            
            
            for(let i = 0; i < ticket.quantity; i++) {
                tkt_class!.tokens.forEach((token: any) => {
                    tokens.push({
                        type: token,
                        id: i + 1
                    })
                });
            }
            
            
        
            const tkt = Ticket.build({
                class: ticket.class,
                quantity: ticket.quantity,
                price: order.total_price,
                event: {
                    id: event!._id,
                    name: event!.name,
                    start_date: event!.start_date,
                    end_date: event!.end_date
                },
                tokens: tokens,
                created_at: new Date(),
                participant: order.user_id,
                order_id: order._id
            });
            
            await tkt.save();
        })
        
        msg.ack();

        natsWrapper.client.publish('event:participant:added', JSON.stringify({
            event_id: event!.id,
            participant_id: order.user_id
        }));

    }

}