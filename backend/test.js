const request = require("supertest");
const app = require("./server");

test("Score test", async () => {
  const res = await request(app)
    .post("/submit")
    .send({ responses: ["A", "B"] });

  expect(res.body.score).toBe(2);
});