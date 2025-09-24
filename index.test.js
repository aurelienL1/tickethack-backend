const request = require("supertest");
const app = require("./app");
const { fakeSearch } = require("./dataTest");

it("POST get trips for search ", async () => {
  const res = await request(app).post(`/search`).send(fakeSearch);
  expect(res.statusCode).toBe(200);
  expect(res.body.result).toEqual(true);
});

it("POST ADD TO CART", async () => {
  const res = await request(app).post(`/addtocart`).send(fakeTrip);
  expect(res.statusCode).toBe(200);
  expect(res.body.result).toEqual(true);
});
