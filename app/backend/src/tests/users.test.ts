import * as chai from 'chai';
import * as sinon from 'sinon';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login tests', function () {
  it('Should return an error message if there is no email or password field', async function () {
    const response = await chai.request(app)
      .post('/login')
      .send({
        email: 'user@user.com'
      });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property("message", 'All fields must be filled');
  });

  it('Should return an error message if the email field is invalid', async function () {
    const response = await chai.request(app)
      .post('/login')
      .send({
        email: 'user.com',
        password: '123456'
      });

    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property("message", 'Invalid email or password');
  });

  it('Should return an error message if the password field is invalid', async function () {
    const response = await chai.request(app)
      .post('/login')
      .send({
        email: 'user@user.com',
        password: '0'
      });
    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property("message", 'Invalid email or password');
  });

  it('Should return an error message if the email field is not in the database  ', async function () {
    const response = await chai.request(app)
      .post('/login')
      .send({
        email: 'test@user.com',
        password: '123456'
      });
    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property("message", 'Invalid email or password');
  });

  afterEach(sinon.restore);
});