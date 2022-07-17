import { Publisher } from '@thr_org/common';
import { Stan } from 'node-nats-streaming';

export class OrgCreatedPublisher extends Publisher {
    subject = 'org:created';

    constructor(client: Stan) {
        super(client);
    }

}