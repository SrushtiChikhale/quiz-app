const request = require("supertest");
const app = require("../server");

test("POST /submit should return score", async () => {
  const res = await request(app)
    .post("/submit")
    .send({
      responses: [
        "Delhi","Pacific","Everest","Nile","Asia",
        "India","1947","Earth","Japan","O2"
      ],
      subject: "gk"
    });

  expect(res.statusCode).toBe(200);
  expect(res.body.correct).toBe(10);
});