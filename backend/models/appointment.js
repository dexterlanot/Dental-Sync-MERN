const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: String,
  treatmentType: String,
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
});

const Appointment = mongoose.model('appointment', appointmentSchema);

module.exports = Appointment;
