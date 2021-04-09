import { Publisher, Subjects, TicketCreatedEvent } from "@progtech/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
