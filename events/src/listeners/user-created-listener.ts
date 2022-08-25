import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Event } from '../models/event';

export class UserCreatedListener extends Listener {
    subject = 'participant:created';
    queueGroupName = 'user-created1';
    async onMessage(data: any, msg: Message) {

        const {id, email, name, dob, gender } = data;

        

        msg.ack();
    }
}