const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  treatment: {
    type: String,
    required: true,
  },
  amountToBePaid: {
    type: Number,
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  remainingBalance: {
    type: Number,
    default: function () {
      return this.amountToBePaid - this.amountPaid;
    },
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  referenceNumber: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['Paid', 'Pending'],
    default: 'Pending',
  },
});

const Transaction = mongoose.model('transactions', transactionSchema);

module.exports = Transaction;
