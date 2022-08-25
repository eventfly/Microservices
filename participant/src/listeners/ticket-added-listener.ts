import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Event } from '../models/event';
import { ObjectId, ObjectIdLike } from 'bson';

export class TicketAddedListener extends Listener {
    subject = 'ticket:added';
    queueGroupName = 'ticket-added-participant';
    async onMessage(data: any, msg: Message) {
        console.log('Ticket added! Data: ', data);

        const {tickets, ref_id} = data;

        const event = await Event.findById(ref_id);
        
        if (!event) {
            throw new Error('Event not found');
        }

        tickets.forEach(async (ticket: any) => {
        
            event.tickets!.push({
                class: ticket.class,
                price: ticket.price,
                quantity: ticket.quantity,
                tokens: ticket.tokens,
                available: ticket.quantity
            });
    
        })

        await event.save();
        
        msg.ack();
    }

}