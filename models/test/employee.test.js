const Employee = require('../employee.model.js');
const Department = require('../department.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

const TEST_FIRSTNAME = "Firstname";
const TEST_LASTNAME = "Lastname";
const TEST_DEPARTMENT = mongoose.Types.ObjectId("63b7faad5b0e8827bdcd5db3");

describe('Employee', () => {

  before

  it('should throw an error if any arg is missing', () => {
    const cases = [
      { firstname: TEST_FIRSTNAME },
      { firstname: TEST_FIRSTNAME, lastname: TEST_LASTNAME }
    ];
    for(let employee of cases) {
      const dep = new Employee(employee);
      dep.validate(err => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('should throw an error if "firstName" is not a String', () => {
    const cases = [
      { firstName: {}, lastname: TEST_LASTNAME, department: TEST_DEPARTMENT },
      { firstName: [], lastname: TEST_LASTNAME, department: TEST_DEPARTMENT }
    ];
    for(let employee of cases) {
      const dep = new Employee(employee);
      dep.validate(err => {
        expect(err.errors.firstName).to.exist;
      });
    }
  });

  it('should throw an error if "lastName" is not a String', () => {
    const cases = [
      { firstName: TEST_FIRSTNAME, lastname: {}, department: TEST_DEPARTMENT },
      { firstName: TEST_FIRSTNAME, lastname: [], department: TEST_DEPARTMENT }
    ];
    for(let employee of cases) {
      const dep = new Employee(employee);
      dep.validate(err => {
        expect(err.errors.lastName).to.exist;
      });
    }
  });

  it('should throw an error if "department" is not an ObjectId', () => {
    const cases = [
      { firstName: TEST_FIRSTNAME, lastname: TEST_LASTNAME, department: {} },
      { firstName: TEST_FIRSTNAME, lastname: TEST_LASTNAME, department: [] },
      { firstName: TEST_FIRSTNAME, lastname: TEST_LASTNAME, department: "Department" }
    ];
    for(let employee of cases) {
      const dep = new Employee(employee);
      dep.validate(err => {
        expect(err.errors.department).to.exist;
      });
    }
  });

  it('should throw an error if "firstName" is too long or too short', () => {
    const cases = [
      { firstName: "", lastname: TEST_LASTNAME, department: TEST_DEPARTMENT },
      { firstName: "abcdefghijklmnopqrstuvwxyz", lastname: TEST_LASTNAME, department: TEST_DEPARTMENT }
    ];
    for(let employee of cases) {
      const dep = new Employee(employee);
      dep.validate(err => {
        expect(err.errors.firstName).to.exist;
      });
    }
  });

  it('should throw an error if "lastName" is too long or too short', () => {
    const cases = [
      { firstName: TEST_FIRSTNAME, lastname: "", department: TEST_DEPARTMENT },
      { firstName: TEST_FIRSTNAME, lastname: "abcdefghijklmnopqrstuvwxyz", department: TEST_DEPARTMENT }
    ];
    for(let employee of cases) {
      const dep = new Employee(employee);
      dep.validate(err => {
        expect(err.errors.lastName).to.exist;
      });
    }
  });
  
  it('should pass if all args are correct', () => {
    const employee = { firstName: TEST_FIRSTNAME, lastName: TEST_LASTNAME, department: TEST_DEPARTMENT };
    const dep = new Employee(employee);
      dep.validate(err => {
        console.log(err)
        expect(err).to.not.exist;
      });
  });

  });
  
  after(() => {
      mongoose.models = {};
  });