const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');

const app = require('../app');

describe('Server Health Checks', () => {
    it('Should exist', () => {
        expect(app).to.exist
    })

    it('Should be able to start', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .end(() => {
                done();
            })
    })

})

describe('Server Response Structure', () => {
    it('Should response with json parasable data', (done) => {
        request(app)
            .get('/test')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('error');
            })
            .end(() => {
                done();
            })
    })
})


