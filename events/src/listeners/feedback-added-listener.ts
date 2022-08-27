import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Event } from '../models/event';
import { ObjectId, ObjectIdLike } from 'bson';

export class FeedbackAddedListener extends Listener {
    subject = 'feedback:added';
    queueGroupName = 'feedback-added-event';
    async onMessage(data: any, msg: Message) {
        
    }

}