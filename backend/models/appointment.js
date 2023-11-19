const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({

});

const Appointment = mongoose.model('appointment', appointmentSchema);

module.exports = Appointment;
