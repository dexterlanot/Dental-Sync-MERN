const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  age: Number,
  gender: String,
  dateOfBirth: {
    type: Date,
    default: new Date(),
  },
  email: String,
  phone: String,
  address: String,
});

const Patient = mongoose.model('patient', patientSchema);

module.exports = Patient;
