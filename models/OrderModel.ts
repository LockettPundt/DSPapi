import mongoose from 'mongoose'

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
  time: {
    type: String,
    required: true,
  },
  services: {
    type: [String],
    required: true,
  },
  acceptTerms: {
    type: Boolean,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

export default mongoose.model('orders', OrderModel);
