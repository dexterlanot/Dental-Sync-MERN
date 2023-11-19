const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
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

const Appointment = mongoose.model('appointment', appointmentSchema);

module.exports = Appointment;
