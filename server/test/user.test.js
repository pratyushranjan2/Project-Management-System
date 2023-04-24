process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import chai from 'chai';
import User from '../models/user/user.js';
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


describe('User API Tests', () => {

    it('Signin user', (done) => {
        chai.request(app)
        .post('/users/signin')
        .send({
            'email': process.env.TEST_USER_EMAIL,
            'password': process.env.TEST_USER_PASSWORD
        })
        .end((err, res) => {
            res.should.have.status(200);
            if (err) console.log('Unable to login test user: ', err);
            done();
        });
    });

});