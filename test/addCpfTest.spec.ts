process.env.NODE_ENV = 'test';

import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../src/app";

chai.should();
chai.use(chaiHttp);


describe('POST /cpf', () => {
    it("should add the cpf", (done) => {
        const cpf = "01659717620";
        chai.request(app)
            .post("/cpf")
            .send({ cpf: cpf })
            .end((err, response) => {
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.cpf.should.have.property('cpf');
                response.body.cpf.should.have.property('createdAt');
                response.body.cpf.should.have.property('cpf').eq(cpf);
                response.body.message.should.be.eq("CPF added");
            done();
            })
    });

    it("should return 400 in add cpf (InvalidCpfException)", (done) => {
        const wrongCpf = "0165971762";
        chai.request(app)
            .post("/cpf")
            .send({ cpf: wrongCpf })
            .end((err, response) => {
                response.should.have.status(400);
                response.body.should.be.a('object');
                response.body.type.should.be.eq("InvalidCpfException");
                response.body.message.should.be.eq("CPF is invalid.");
            done();
            });
    });

    it("should return 400 in add cpf (ExistsCpfException)", (done) => {
        const cpf = "01659717620";
        chai.request(app)
            .post("/cpf")
            .send({ cpf: cpf })
            .then(() => {
                chai.request(app)
                    .post("/cpf")
                    .send({ cpf: cpf })
                    .end((err, response) => {
                        response.should.have.status(400);
                        response.body.should.be.a('object');
                        response.body.type.should.be.eq("ExistsCpfException");
                        response.body.message.should.be.eq("CPF already exists.");
                    done();
                    })
            });
    });
});
