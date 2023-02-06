const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');

const app = require('../app');

describe('Machine API', () => {
    let createdId = null;
    let currentName = null;

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

    it('should return a list of all machines', (done) => {
        request(app)
            .get('/api/machines')
            .expect(200)
            .expect((res) => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(1);
            })
            .end((err) => {
                if(err) return done(err);
                done();
            })
    })

    it('should be able to lookup a single machine', (done) => {
        request(app)
            .get(`/api/machines/${createdId}`)
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

    it('Should update a Machine and return the updated machine', (done) => {
        request(app)
            .put(`/api/machines/${createdId}`)
            .send({
                name: 'Updated Machine',
                link: 'http://updated.com'
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.data._id).to.equal(createdId);
                expect(res.body.data.name).to.equal('Updated Machine');
                expect(res.body.data.link).to.equal('http://updated.com');
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
