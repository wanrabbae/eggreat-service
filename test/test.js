require('dotenv').config()
const request = require("supertest");
const app = require("../index");
describe("GET /", () => {
    it("respond with Eggreat backend service started!!", (done) => {
        request(app).get("/").expect("Eggreat backend service started!!", done);
    })
});