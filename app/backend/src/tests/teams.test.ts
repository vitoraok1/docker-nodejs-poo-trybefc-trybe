import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { allTeams, oneTeam } from './mocks/teamsMock';
import Teams from '../database/models/Teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams Test', function() {
  it('Return all teams', async function () {
    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(allTeams);
  });
  
  it('Return a team filtered by ID', async function () {
    const response = await chai.request(app).get('/teams/1');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(oneTeam);
  });

  it('Should return a error if a inexistent id is passed', async function () {
    const response = await chai.request(app).get('/teams/123');

    expect(response.status).to.be.equal(404);
    expect(response.body).to.deep.equal({ message: 'Team 123 not found'});
  });

  afterEach(sinon.restore);
});
