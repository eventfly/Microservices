import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Event } from '../models/event';
import { ObjectId, ObjectIdLike } from 'bson';
import { Feedback } from '../models/feedback';

export class FeedbackAddedListener extends Listener {
    subject = 'feedback:added';
    queueGroupName = 'feedback-added-event';
    async onMessage(data: any, msg: Message) {
        console.log('Feedback Added! Data: ', data);

        const feedback = await Feedback.build({
            _id: new ObjectId(data.id),
            user_id: new ObjectId(data.user_id),
            event_id: new ObjectId(data.event_id),
            rating: data.rating,
            comment: data.comment
        });

        const event = await Event.findOne({ref_id: data.event_id});
        
        event.feedbacks.push(feedback);
        event.total_rating += data.rating;

        await feedback.save();
        await event.save();
        

        msg.ack();
    }

}