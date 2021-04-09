import mongoose from "mongoose";
import request from "supertest";
import { Ticket } from "../../models/tickets";
import { Order, OrderStatus } from "../../models/order";
import { app } from "../../app";

it("fetches the order", async () => {
  //Create a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    id: mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();

  const user = global.signin();

  //make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  //make a request to fetch order

  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});

it("returns an error if one user try to fetch another user order", async () => {
  //Create a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    id: mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();

  const user = global.signin();

  //make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  //make a request to fetch order

  await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(401);
});
