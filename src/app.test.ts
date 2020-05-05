import request from "supertest";
import app from "./app";

describe("App", () => {
  it("should response the GET method", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.text).toBe("Hello World");
        done();
      });
  });
});
