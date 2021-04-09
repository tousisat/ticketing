import { Ticket } from "../../../models/tickets";
import { OrderCreatedListener } from "../order-created-listener";
import { natsWrapper } from "./../../../nats-wrapper";
import { OrderCreatedEvent, OrderStatus } from "@progtech/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

const setup = async () => {
  //Create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  //Create and save a ticker
  const ticket = Ticket.build({
    title: "concert",
    price: 99,
    userId: "sdfsdfsdf",
  });
  await ticket.save();

  //Create the fake data event
  const data: OrderCreatedEvent["data"] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: "sdsd",
    expiresAt: "asdadasd",
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};

it("sets the userId of the ticket", async () => {
  const { data, listener, ticket, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).toEqual(data.id);
});

it("acks the message", async () => {
  const { data, listener, ticket, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it("publishes a ticket updated event", async () => {
  const { data, listener, ticket, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
