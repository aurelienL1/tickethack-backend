const request = require("supertest");
const app = require("./app");
const { fakeTrips } = require("./dataTest");

it("POST /cart with trips", async () => {
  const res = await request(app).post(`/cart`).send({
    trips: fakeTrips,
  });
  expect(res.statusCode).toBe(200);
  expect(res.body.result).toEqual(true);
  expect(res.body.message).toEqual("Purchase successfully done.");
});

it("POST /cart with trips empty", async () => {
  const res = await request(app).post(`/cart`).send({
    trips: [],
  });
  expect(res.statusCode).toBe(500);
  expect(res.body.result).toEqual(false);
  expect(res.body.error).toEqual("Missing or empty fields");
});

it("POST /cart with trips undefined", async () => {
  const res = await request(app).post(`/cart`).send({ trips: undefined });
  expect(res.statusCode).toBe(500);
  expect(res.body.result).toEqual(false);
  expect(res.body.error).toEqual("Missing or empty fields");
});
