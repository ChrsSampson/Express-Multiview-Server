const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const dotenv = require('dotenv');


const app = require('../app');

dotenv.config({path: './.env.development.local'});


describe('User Crud Operations', () => {
    let createdUserId = null

    it('Should fail to create a user with missing field', (done) => {
        request(app)
            .post('/api/users')
            .send({
                username: 'testyBoi'
            })
            .expect(400)
            .expect('Content-Type', /json/)
            .expect(res => {
                res.body.message === 'Missing Required Field (username, password)'
            })
            .end((err, res) => {
                if(err) throw err;
                done();
            });
    })

    it('Should be able to create a new User with required fields filled', (done) => {
        request(app)
            .post('/api/users')
            .send({
                username: 'testyBoi',
                password: '1234'
            })
            .expect(201)
            .expect('Content-Type', /json/)
            .expect((res) => {
                res.status.message === 'Success'
                res.body.data.password !== '1234'
                createdUserId = res.body.data._id
            })
            .end((err, res) => {
                if(err) throw err;
                done();
            });
    });

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
                expect(typeof(res.body.data)).to.be.equal('object');
                expect(res.body.data).to.have.property('length');
            })
            .end((err, res) => {
                if(err) throw err;
                done();
            })
    })

    it('Should be able to find a specific user by id', (done) => {
        request(app)
            .get(`/api/users/${createdUserId}`)
            .expect(200)
            .expect(res => {
                res.body.data._id === createdUserId
            })
            .end((err, res) => {
                if(err) throw err;
                done();
            })
    })

    it('Should be able to update a specific user by id', (done) => {
        request(app)
            .put(`/api/users/${createdUserId}`)
            .send({
                username: 'SuperTestyBoi'
            })
            .expect(200)
            .expect(res => {
                res.body.data._id === createdUserId
                res.body.data.displayName === 'SuperTestyBoi'
            })
            .end((err, res) => {
                if(err) throw err;
                done();
            })
    })


    it('Should be able find a delete a specific user by id', (done) => {
        request(app)
            .delete(`/api/users/${createdUserId}`)
            .expect(200)
            .expect(res => {
                res.body.data._id === createdUserId
            })
            .end((err, res) => {
                if(err) throw err;
                done()
            })
    })


})