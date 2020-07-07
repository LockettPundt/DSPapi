const mongoose = require('mongoose');

const OrderModel = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: String,
    required: true,
  },
  jobDate: {
    type: String,
    required: true,
  },
  services: {
    type: [String],
    required: true,
  },
  terms: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('orders', OrderModel);
