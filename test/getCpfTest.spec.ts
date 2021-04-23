process.env.NODE_ENV = 'test';

import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../src/app";

chai.should();
chai.use(chaiHttp);

describe("GET /cpf/:cpf", () => {
    it("should return 200 in get specific cpf (OK)", (done) => {
        const cpf = "01659717620";
        chai.request(app)
            .post("/cpf")
            .send({ cpf: cpf })
            .then(() => {
                chai.request(app)
                    .get("/cpf/" + cpf)
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('object');
                        response.body.Content.should.have.property('cpf');
                        response.body.Content.should.have.property('createdAt');
                        response.body.Content.should.have.property('cpf').eq(cpf);
                    done();
                    });
            })
    });

    it("should return 400 in get specific cpf (InvalidCpfException)", (done) => {
        const cpf = "0165971762";
        chai.request(app)
            .get(`/cpf/${cpf}`)
            .end((err, response) => {
                response.should.have.status(400);
                response.body.should.be.a('object');
                response.body.type.should.be.eq("InvalidCpfException");
                response.body.message.should.be.eq("CPF is invalid.");
            done();
            });
    });

    it("should return 400 in get specific cpf (NotFoundCpfException)", (done) => {
        const cpf = "01659717620";
        chai.request(app)
            .delete(`/cpf/${cpf}`)
            .then(() => {
                chai.request(app)
                    .get(`/cpf/${cpf}`)
                    .end((err, response) => {
                        response.should.have.status(400);
                        response.body.should.be.a('object');
                        response.body.type.should.be.eq("NotFoundCpfException");
                        response.body.message.should.be.eq("CPF do not exists.");
                    done();
                    });
            });
    });
});