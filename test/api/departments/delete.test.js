const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Department = require('../../../models/department.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

const DEPARTMENT_ID = '5d9f1140f10a81216cfd4408';
const DEPARTMENT_NAME = 'Department #1';

describe('DELETE /api/departments', () => {
  before(async () => {
    const testDepOne = new Department({ _id: DEPARTMENT_ID, name: DEPARTMENT_NAME });
    await testDepOne.save();
  });
  
  after(async () => {
    await Department.deleteMany();
  });

  it('/:id should update chosen document and return success', async () => {
    const res = await request(server).delete(`/api/departments/${DEPARTMENT_ID}`);
    const updatedDepartment = await Department.findOne({ _id: DEPARTMENT_ID });
    expect(res.status).to.be.equal(204);
    expect(updatedDepartment).to.be.null;
  });
});
