import { Publisher, Subjects, PaymentCreatedEvent } from "@progtech/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
