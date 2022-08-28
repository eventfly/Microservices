import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { participant } from '../models/participant';

export class ParticipantDeletedListener extends Listener {
    subject = 'participant:deleted';
    queueGroupName = 'participant-deleted-auth';

    async onMessage(data: any, msg: Message) {
        console.log('Participant Deleted! Data: ', data);

        const user = await participant.findOneAndDelete({ref_id: data.id});
        
        msg.ack();
    }

}