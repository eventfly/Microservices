import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { ObjectId, ObjectIdLike } from 'bson';

import { Event } from '../models/event';
import { Participant } from '../models/participant';


export class EventParticipantAddedListener extends Listener {
    subject = 'event:participant:added';
    queueGroupName = 'event-participant-added-analytics';

    async onMessage(data: any, msg: Message) {
        console.log('Event participant added! Data: ', data);

        const {event_id, participant_id} = data;

        const participant = await Participant.findOne({_id: participant_id});

        if(!participant){
            const newParticipant = new Participant({
                _id: participant_id,
                events: [event_id]
            })

            await newParticipant.save()
        }
        else{
            participant.events!.push(event_id)
            await participant.save()
        }
        

        msg.ack();

        
    }

}