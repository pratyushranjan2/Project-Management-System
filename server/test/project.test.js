process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import chai from 'chai';
import Project from '../models/project/project.js';
const expect = chai.expect;
const should = chai.should();
import chaiHttp from 'chai-http';
import app from '../index.js';

chai.use(chaiHttp);

before((done) => {
    // anything to be done before tests
    done();
});

after((done) => {
    // anything to be done after tests
    done();
});


describe('Project API Tests', () => {

    it('Get projects test', (done) => {
        chai.request(app)
        .get('/projects')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        });
    });

});