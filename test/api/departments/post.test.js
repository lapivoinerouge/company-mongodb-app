const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Department = require('../../../models/department.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

const DEPARTMENT_NAME = 'Department #1';

describe('POST /api/departments', () => {
  after(async () => {
    await Department.deleteMany();
  });

  it('/ should insert new document to db and return success', async () => {
    const res = await request(server).post('/api/departments').send({ name: DEPARTMENT_NAME });
    const newDepartment = await Department.findOne({ name: DEPARTMENT_NAME });
    expect(res.status).to.be.equal(200);
    expect(res.body.name).to.be.equal(DEPARTMENT_NAME);

    expect(newDepartment).to.not.be.null;
  });
});