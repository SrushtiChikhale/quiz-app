const request = require("supertest");
const app = require("./server");

test("Score test", async () => {
  const res = await request(app)
    .post("/submit")
    .send({ responses: ["B", "B", "B", "C", "C"] });

  expect(res.body.score).toBe(5);
});