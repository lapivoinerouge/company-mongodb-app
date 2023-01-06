const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 1, maxlength: 20 },
    lastName: { type: String, required: true, minlength: 1, maxlength: 20 },
    department: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Department' }
  });

  module.exports = mongoose.model('Employee', employeeSchema);