import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import Service from '../service/Login';

chai.use(chaiHttp);
const { expect } = chai;

const service = new Service();

const response = {
	token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjY2ODA1OTg0LCJleHAiOjE2NjY4NjU5ODR9.xUVogRZ5qlZmjKplBvh9hsNkOoIjj0RNoYid5n9gwUU",
};

const request = {
  email: "admin@admin.com",
  password: "secret_admin",
}

describe('Testa a camada controller de Login', () => {  
  
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(service, "findUser")
      .resolves(response as any);
  });

  after(()=>{
    (service.findUser as sinon.SinonStub).restore();
  })

  it('Verifica se ao encaminhar um login e senha válidos retorna status 200', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(request);
    expect(chaiHttpResponse.status).to.equal(200);
  });
});
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });