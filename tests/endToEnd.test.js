const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const dotenv = require('dotenv');
const cookieJar = request('cookieJar')

const app = require('../app');

dotenv.config({path: './.env.development.local'});

const seeder = require('../util/seeder');
const User = require('../models/User');
const Machine = require('../models/Machine');
const req = require('express/lib/request');

describe.only('User API', () => {
    let createdUserId = null

    // setup and cleanup
    let ids = null

    before((done) => {
        seeder()
            .then((data) => {
                ids = data;
                console.log(ids)
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    beforeEach((done) => {
        request(app)
            .post('/api/auth/login')
            .send({
                username: 'a@test.com',
                password: 'admin'
            })
            .expect('Content-Type', /json/)
            .expect(res => {
                console.log(res.getCookies)
                res.body.message === 'Login Successful'
            })
            .end((err, res) => {
                if(err) throw err;
                done(err);
            });
    });

    // clean up after tests
    after((done) => {
        User.deleteMany({}, (err) => {
            if(err) throw err;
            done();
        });
        Machine.deleteMany({}, (err) => {
            if(err) throw err;
            done();
        }) 
    });

    it('Should fail to create a user with missing fields', (done) => {
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
                expect(res.body.data.length).to.be.greaterThan(2);
            })
            .end((err, res) => {
                if(err) throw err;
                done();
            })
    })

    it('Should be able to find a specific user by id', (done) => {
        request(app)
            .get(`/api/users/${ids.users[0]}`)
            .expect(200)
            .expect(res => {
                res.body.data._id === ids.users[0]
                res.body.data.email === ids.users[0].email
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
                      s })
    })

});
 
describe('Machine API', () => {
    let createdId = null;
    let currentName = null;

    // setup and cleanup
    let ids = null

    before((done) => {
        seeder()
            .then((data) => {
                ids = data;
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    // clean up after tests
    after((done) => {
        User.deleteMany({}, (err) => {
            if(err) throw err;
        });
        Machine.deleteMany({})
            .then(() => {
                done();
            })
    });

    it('should create a new machine', (done) => {
        request(app)
            .post('/api/machines')
            .send({
                name: 'Test Machine',
                link: 'http://test.com'
            })
            .expect(201)
            .expect((res) => {
                res.body.data.name === 'Test Machine';
                res.body.data.link === 'http://test.com';
                createdId = res.body.data._id;
                currentName = res.body.data.name;
            })
            .end((err) => {
                if(err) throw err;
                done()
            })
    });

    it('Should fail to create machine without name', (done) => {
        request(app)
            .post('/api/machines')
            .send({
                link: 'http://test.com'
            })
            .expect(400)
            .expect((res) => {
                expect(res.body.message).to.equal('Missing required fields (name, link)');
            })
            .end((err) => {
                if(err) return done(err);
                done();
            })
    });

    it('Should fail to create machine without link', (done) => {
        request(app)
            .post('/api/machines')
            .send({
                name: 'Test Machine'
            })
            .expect(400)
            .expect((res) => {
                expect(res.body.message).to.equal('Missing required fields (name, link)');
            })
            .end((err) => {
                if(err) return done(err);
                done();
            })
    })  

    it('should return a list of all machines', (done) => {
        request(app)
            .get('/api/machines')
            .expect((res) => {
                expect(res.body.data).to.be.an('array');
                expect(res.body.data).to.have.lengthOf(5);
            })
            .end((err) => {
                if(err) return done(err);
                done();
            })
    })

    it('should be able to lookup a single machine', (done) => {
        request(app)
            .get(`/api/machines/${createdId}`)
            .expect((res) => {
                expect(res.body.data.name).to.equal(currentName);
            })
            .end((err) => {
                if(err) return done(err);
                done();
            })
    });

    it('Should update a Machine and return the updated machine', (done) => {
        request(app)
            .put(`/api/machines/${createdId}`)
            .send({
                name: 'Updated Machine',
                link: 'http://updated.com',
                tag: 'Desktop Encoder'
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.data._id).to.equal(createdId);
                expect(res.body.data.name).to.equal('Updated Machine');
                expect(res.body.data.link).to.equal('http://updated.com');
                expect(res.body.data.tag).to.equal('Desktop Encoder');
                currentName = res.body.data.name;
            })
            .end((err) => {
                if(err) return done(err);
                done();
            })
    });

    it('Should delete a Machine and return the deleted machine', (done) => {
        request(app)
            .delete(`/api/machines/${createdId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.data._id).to.equal(createdId);
                expect(res.body.data.name).to.equal(currentName);
            })
            .end((err) => {
                if(err) return done(err);
                done();
            })
    });
});

describe('Auth API', () => {
    let createdUserId = null

    after((done) => {
        // remove the created user
        User.deleteMany({}, (err) => {
            if(err) throw err;
            done()
        });
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

            })
            .end((err, res) => {
                if(err) throw err;
                done();
            })
    });

});
