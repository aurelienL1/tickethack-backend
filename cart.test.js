const request = require("supertest");
const app = require("./app");
const { fakeCart, fakeTrip } = require("./dataTest");

it("GET /cart", async () => {
  const res = await request(app).get(`/cart`);

  expect(res.statusCode).toBe(200);
  expect(res.body.result).toEqual(true);
});

it("POST /cart/purchase ", async () => {
  const res = await request(app).post(`/cart/purchase`).send({
    cart: fakeCart,
  });
  expect(res.statusCode).toBe(200);
  expect(res.body.result).toEqual(true);
  expect(res.body.message).toEqual("Purchase successfully done.");
});

it("DELETE /cart ", async () => {
  const res = await request(app).delete(`/cart`).send({
    trip: fakeTrip,
  });
  expect(res.statusCode).toBe(200);
  expect(res.body.result).toEqual(true);
  expect(res.body.message).toEqual("Delete trip from cart OK");
});
