process.env.NODE_ENV = 'test';

import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../src/app";

chai.should();
chai.use(chaiHttp);

describe("DELETE /cpf/:cpf", () => {
    it("should return 200 in remove specific cpf (OK)", (done) => {
        const cpf = "01659717620";
        chai.request(app)
            .post("/cpf")
            .send({ cpf: cpf })
            .then(() => {
                chai.request(app)
                    .delete(`/cpf/${cpf}`)
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('object');
                    done();
                    });
            });
    });

    it("should return 400 in remove specific cpf (InvalidCpfException)", (done) => {
        const cpf = "0165971762";
        chai.request(app)
            .delete(`/cpf/${cpf}`)
            .end((err, response) => {
                response.should.have.status(400);
                response.body.should.be.a('object');
                response.body.type.should.be.eq("InvalidCpfException");
                response.body.message.should.be.eq("CPF is invalid.");
            done();
            });
    });

    it("should return 400 in remove specific cpf (NotFoundCpfException)", (done) => {
        const cpf = "01659717620";
        chai.request(app)
            .delete(`/cpf/${cpf}`)
            .then(() => {
                chai.request(app)
                    .delete(`/cpf/${cpf}`)
                    .end((err, response) => {
                        response.should.have.status(400);
                        response.body.should.be.a('object');
                        response.body.type.should.be.eq("NotFoundCpfException");
                        response.body.message.should.be.eq("CPF do not exists.");
                    done();
                    });
            });
    });
})