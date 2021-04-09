import { Publisher, Subjects, TicketUpdatedEvent } from "@progtech/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
