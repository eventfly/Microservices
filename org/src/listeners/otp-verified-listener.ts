import { Listener } from '@thr_org/common'
import { Message } from 'node-nats-streaming'
import { Staff } from '../models/staff';

export class OtpVerifiedListener extends Listener{
    subject = 'otp:verified';
    queueGroupName = 'otp-verified';

    async onMessage(data: any, msg: Message) {
        console.log('Otp verified! Data: ', data);

        const staff = await Staff.findByIdAndUpdate(data.ref_id, data, {
            new: true,
            runValidators: true
        })
        
        msg.ack();
    }
}