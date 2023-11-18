const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

const User = mongoose.model('user', userSchema)

module.exports = User


const transactionSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dateAndTime: { type: Date, default: Date.now },
    treatment: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    referenceNumber: { type: String },
    status: { type: String, enum: ['Paid', 'Pending'], default: 'Pending' },
  });
  
  const Transaction = mongoose.model('transaction', transactionSchema);
  
  const patientSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String },
    age: { type: Number },
    dateOfBirth: { type: Date },
    phoneNumber: { type: String },
    email: { type: String },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    address: { type: String },
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    registerDate: { type: Date, default: Date.now },
  });
  
  const Patient = mongoose.model('patient', patientSchema);
  
  const dentistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    profilePicture: { type: String },
    specialization: { type: String },
    experienceYears: { type: Number },
    education: { type: String },
    clinicAddress: { type: String },
    contactNumber: { type: String },
  });
  
  const DentistProfile = mongoose.model('dentistProfile', dentistSchema);
  
  const appointmentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    treatmentType: { type: String, required: true },
    dateAndTime: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' },
  });
  
  const Appointment = mongoose.model('appointment', appointmentSchema);
  
  module.exports = { User, Transaction, Patient, DentistProfile, Appointment };