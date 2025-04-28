// backend/models/Ticket.js
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  branchCode: {
    type: String,
    required: true,
  },
  anydeskNumber: {
    type: String,
    required: false,
  },
  details: {
    type: String,
    required: true,
  },
  issueType: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
