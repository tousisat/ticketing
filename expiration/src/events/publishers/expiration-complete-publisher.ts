import { Subjects, Publisher, ExpirationCompleteEvent } from "@progtech/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
