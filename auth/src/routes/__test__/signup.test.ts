import request from "supertest";
import { app } from "../../app";

it("returns a 201 on succesfull signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "test1234",
    })
    .expect(201);
});

it("returns a 400 on invalid email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test.com",
      password: "test1234",
    })
    .expect(400);
});

it("returns a 400 on invalid password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test.com",
      password: "1s",
    })
    .expect(400);
});

it("returns a 400 on missing email or password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test.com",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      password: "test1234",
    })
    .expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "test1234",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "test1234",
    })
    .expect(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "test1234",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
