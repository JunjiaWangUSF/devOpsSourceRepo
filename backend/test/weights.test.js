import request from "supertest";
import server from "../src/app.js"; // Make sure t his is the correct path and export

describe("Database Operations", () => {
  test("should retrieve mock data from the database", async () => {
    const response = await request(server).get("/weights/test");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).not.toHaveLength(0);
    const weightEntry = response.body.find(
      (entry) => entry.username === "test"
    );
    expect(weightEntry).toBeDefined();
  });
});
