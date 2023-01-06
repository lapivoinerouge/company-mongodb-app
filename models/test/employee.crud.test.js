const Employee = require('../employee.model');
const Department = require('../department.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

const testEmployeeOne = { firstName: "Lajka", lastName: "Piesek", department: "Spanko" };
const testEmployeeTwo = { firstName: "Zuzia", lastName: "Tezpiesek", department: "Jedzonko" };

before(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
  } catch(err) {
    console.error(err);
  }
});

describe('Employee', () => {
  after(() => {
    mongoose.models = {};
  });
});

describe('Reading data', () => {
  before(async () => {
    await new Employee(testEmployeeOne).save();
    await new Employee(testEmployeeTwo).save();
  });

  after(async () => {
    await Employee.deleteMany();
  });

  it('should return all the data with "find" method', async () => {
    const employees = await Employee.find();
    const expectedLength = 2;
    expect(employees.length).to.be.equal(expectedLength);
  });

  it('should return a proper document by "firstName" with "findOne" method', async () => {
    const employee = await Employee.findOne({ firstName: testEmployeeOne.firstName });
    expect(employee.firstName).to.be.equal(testEmployeeOne.firstName);
  });

  it('should return a proper document by "lastName" with "findOne" method', async () => {
      const employee = await Employee.findOne({ lastName: testEmployeeTwo.lastName });
      expect(employee.lastName).to.be.equal(testEmployeeTwo.lastName);
    });

  it('should return a proper document by "department" with "findOne" method', async () => {
    const employee = await Employee.findOne({ department: testEmployeeOne.department });
    expect(employee.department).to.be.equal(testEmployeeOne.department);
  });
});

describe('Creating data', () => {
  after(async () => {
    await Employee.deleteMany();
  });

  it('should insert new document with "insertOne" method', async () => {
    const newEmployee = new Employee({ firstName: "Lajka", lastName: "Piesek", department: "Spanko" });
    await newEmployee.save();
    expect(newEmployee.isNew).to.be.false;
  });
});

describe('Updating data', () => {
  beforeEach(async () => {
    await new Employee(testEmployeeOne).save();
    await new Employee(testEmployeeTwo).save();
  });

  afterEach(async () => {
    await Employee.deleteMany();
  });

  it('should properly update one document with "updateOne" method', async () => {
    await Employee.updateOne({ firstName: testEmployeeOne.firstName }, { $set: { firstName: 'Chewbacca' }});
    const updatedEmployee = await Employee.findOne({ firstName: 'Chewbacca' });
    expect(updatedEmployee).to.not.be.null;
  });

  it('should properly update one document with "save" method', async () => {
    const employee = await Employee.findOne({ lastName: testEmployeeTwo.lastName });
    employee.lastName = 'Chewbacca';
    await employee.save();
  
    const updatedEmployee = await Employee.findOne({ name: 'Chewbacca' });
    expect(updatedEmployee).to.not.be.null;
  });

  it('should properly update multiple documents with "updateMany" method', async () => {
    const employee1 = await Employee.findOne({ firstName: testEmployeeOne.firstName });
    const employee2 = await Employee.findOne({ firstName: testEmployeeTwo.firstName });
    employee1.firstName = 'Chewbacca1';
    employee2.firstName = 'Chewbacca2';
    await employee1.save();
    await employee2.save();
  
    const updatedEmployees = await Employee.find({ firstName: {$in: ['Chewbacca1', 'Chewbacca2']} });
    expect(updatedEmployees.length).to.be.equal(2);
  });
});

describe('Removing data', () => {
  beforeEach(async () => {
    await new Employee(testEmployeeOne).save();
    await new Employee(testEmployeeTwo).save();
  });

  afterEach(async () => {
    await Employee.deleteMany();
  });

  it('should properly remove one document with "deleteOne" method', async () => {
    await Employee.deleteOne({ firstName: testEmployeeTwo.firstName });
    const removedEmployee = await Employee.findOne({ firstName: testEmployeeTwo.firstName });
    expect(removedEmployee).to.be.null;
  });

  it('should properly remove one document with "remove" method', async () => {
    const employee = await Employee.findOne({ lastName: testEmployeeTwo.lastName });
    await employee.remove();
    const removedEmployee = await Employee.findOne({ lastName: testEmployeeTwo.lastName });
    expect(removedEmployee).to.be.null;
  });

  it('should properly remove multiple documents with "deleteMany" method', async () => {
    await Employee.deleteMany();
    const employees = await Employee.find();
    expect(employees.length).to.be.equal(0);
  });
});

describe('Populating data', () => {
  before(async () => {
    const department = new Department({ name: "Real Department"});
    await department.save();

    await new Employee({ firstName: "Real", lastName: "Employee", department: department.name }).save();
  });

  after(async () => {
    await Employee.deleteMany();
    await Department.deleteMany();
  });

  it('should populate one document with "populate" method', async () => {
    console.log(await Employee.find())
    console.log(await Department.find())
    await Employee.find().populate({path: 'department', model: Department});
    // const removedEmployee = await Employee.findOne({ firstName: testEmployeeTwo.firstName });
    // expect(removedEmployee).to.be.null;
  });
});
