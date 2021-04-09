import { Publisher, OrderCreatedEvent, Subjects } from "@progtech/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
