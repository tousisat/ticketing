import { Publisher, OrderCancelledEvent, Subjects } from "@progtech/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
