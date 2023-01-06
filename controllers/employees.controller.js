const Employee = require('../models/employee.model');
const Department = require('../models/department.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Employee.find().populate('department'));
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.getRandom = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const data = await Employee.findOne().skip(rand).populate('department');
    if(!data) res.status(404).json({ message: 'Not found' });
    else res.json(data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.getById = async (req, res) => {
  try {
    const data = await Employee.findById(req.params.id).populate('department');
    if(!data) res.status(404).json({ message: 'Not found' });
    else res.json(data);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.post = async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    const dep = await Department.find({ name: department });
    if(!dep) res.status(404).json({ message: 'Department not found' });
    const newEmployee = new Employee({ firstName: firstName, lastName: lastName, department: dep._id });
    await newEmployee.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.put = async (req, res) => {
  const { firstName, lastName, department } = req.body;
  const dep = await Department.find({ name: department });
  if(!dep) res.status(404).json({ message: 'Department not found' });
  try {
    await Employee.updateOne({ _id: req.params.id }, { $set: { firstName: firstName, lastName: lastName, department: dep._id }});
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.delete = async (req, res) => {
  try {
    const dep = await Employee.findById(req.params.id);
    if(dep) {
      await Employee.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}