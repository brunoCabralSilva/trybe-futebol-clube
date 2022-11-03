import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';

import Service from '../service/Login';
import Model from '../database/models/Users';
import Authentication from '../utils/Authentication';
import { response, responseValidate, request, request2 } from '../tests/Mocks/login.mocks'

chai.use(chaiHttp);
const { expect } = chai;

const service = new Service();
const authentication = new Authentication();

describe('Testa a camada controller de Login', () => {  

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(service, "findUser")
      .resolves(response as any);
    sinon
      .stub(authentication, "verify")
      .resolves(responseValidate as any);
  });

  after(()=>{
    (service.findUser as sinon.SinonStub).restore();
    (authentication.verify as sinon.SinonStub).restore();
  })

  it('Verifica se ao encaminhar um login e senha válidos retorna status 200', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(request);
    expect(chaiHttpResponse.status).to.equal(200);
  });

  it('Verifica se ao encaminhar um login e senha inválidos retorna status 401', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(request2);
    expect(chaiHttpResponse.status).to.equal(401);
  });

  it('Verifica se um token inválido retorna um status 400', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/validate').send();
    expect(chaiHttpResponse.status).to.equal(400);
  });
});

const findOne = {
  dataValues: {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  },
};

describe('Testa a camada Service de Login', () => {  

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Model, "findOne")
      .resolves(findOne as any);
  });

  after(()=>{
    (Model.findOne as sinon.SinonStub).restore();
  });
  
});

//   it('Verifica se ao encaminhar um login e senha válidos retorna um objeto', async () => {
//     chaiHttpResponse = await chai.request(app).post('/login').send(request);
//     expect(chaiHttpResponse.status).to.equal(200);
//   });

//   it('Verifica se ao encaminhar um login e senha inválidos retorna null', async () => {
//     chaiHttpResponse = await chai.request(app).post('/login').send(request2);
//     expect(chaiHttpResponse.status).to.equal(401);
//   });
// });
