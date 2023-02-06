const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');

const app = require('../app');

describe('Auth API', () => {
    let createdUserId = null

    after((done) => {
        // remove the created user
        request(app)
            .delete(`/api/users/${createdUserId}`)
            .expect(res => {
                console.log(res.body)
            })
            .end((err, res) => {
                if(err) throw err;
                done()
            })
    });

    it('Should be able to create a user', async () => {
        request(app)
            .post('/api/users')
            .send({
                username: 'AuthBoi',
                password: '1234'
            })
            .expect(201)
            .expect('Content-Type', /json/)
            .expect((res) => {
                console.log(res.body)
                res.status.message === 'Success'
                res.body.data.password !== '1234'
                createdUserId = res.body.data._id
            })
            .end((err, res) => {
                if(err) throw err;
                done();
            });
    });

    it('Should be able to login a user', async () => {
        request(app)
            .post('/api/auth/login')
            .send({
                username: 'AuthBoi',
                password: '1234'
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res) => {
                console.log(res.body)
                res.status.message === 'Login Successful'
                res.body.data._id === createdUserId
                res.body.data.email === 'AuthBoi'
            })
            .end((err, res) => {
                if(err) throw err;
                done();
            })
    });

});