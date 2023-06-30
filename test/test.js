import 'dotenv/config'
import request from "supertest"
import app from "../index.js"

describe("GET /", () => {
    it("respond with Eggreat backend service started!!", (done) => {
        request(app).get("/").expect("Eggreat backend service started!!", done);
    })
});