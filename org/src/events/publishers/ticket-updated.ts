import { Publisher, Subjects, TicketUpdatedEvent } from '@thr_org/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;

}