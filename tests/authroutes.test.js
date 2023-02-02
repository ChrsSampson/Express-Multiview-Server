const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const dotenv = require('dotenv');

const app = require('../app');

dotenv.config({path: './.env.development.local'});


describe('User Crud Operations', () => {
    it('Should be able to get a list of all users', (done) => {
        request(app)
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('error');
                console.log(res)
            })
            .end((err, res) => {
                if(err) throw err;
                done();
            })
    })
})