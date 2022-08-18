import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { ObjectId, ObjectIdLike } from 'bson';

import { Event } from '../models/event';
import { User } from '../models/user';
import { Feed } from '../models/feed';


export class EventParticipantAddedListener extends Listener {
    subject = 'event:participant:added';
    queueGroupName = 'event-participant-added-newsfeed';
    async onMessage(data: any, msg: Message) {
        console.log('Event participant added! Data: ', data);

        const {event_id, participant_id} = data;
    
        const event = await Event.findOne({_id: event_id});
        const user  = await User.findOne({_id: participant_id});
        
        if (!event || !user) {
            throw new Error('Event or user not found');
        }

        event.participants.push(user._id);
        event.followers.push(user._id);
        await event.save();

        user.events.push(event._id);
        await user.save();

        let feed = Feed.findOne({user_id: user._id});

        if (!feed) {
            feed = Feed.build({
                user_id: user._id
            });

            await feed.save();
        }

        msg.ack();

        
    }

}