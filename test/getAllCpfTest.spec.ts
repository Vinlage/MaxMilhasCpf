process.env.NODE_ENV = 'test';

import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../src/app";

chai.should();
chai.use(chaiHttp);

describe("GET /cpf", () => {
    it("should return 200 in get all cpf (OK)", (done) => {
        chai.request(app)
            .get("/cpf")
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
            done();
            });
    });
});