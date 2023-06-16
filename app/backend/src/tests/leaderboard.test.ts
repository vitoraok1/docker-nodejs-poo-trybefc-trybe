import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import { awayTeamsMock, homeTeamsMock } from './mocks/leaderboardMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Usando o método GET em /leaderboard', function () {
  let chaiHttpResponse: Response;

  it('Should return all home team stats', async function () {
     chaiHttpResponse = await chai
       .request(app).get('/leaderboard/home').send(homeTeamsMock);
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Should return all away team stats', async function () {
    chaiHttpResponse = await chai
      .request(app).get('/leaderboard/away').send(awayTeamsMock);
   expect(chaiHttpResponse.status).to.be.equal(200);
 });

  afterEach(sinon.restore);
});