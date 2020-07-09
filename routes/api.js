const express = require('express');
const OrderModel = require('../models/OrderModel');
const nodeMailer = require('../utils/clientMailer');

const router = express.Router();

// GET single order.
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const response = await OrderModel.findOne({ _id: id });
  res.json(response);
});

router.post('/addjob', async (req, res) => {
  console.log(req.body);
  const {
    firstName,
    lastName,
    email,
    dateCreated,
    jobDate,
    services,
    acceptTerms,
    time,
  } = req.body;

  const order = new OrderModel({
    firstName,
    lastName,
    email,
    dateCreated,
    jobDate,
    terms: acceptTerms,
    services,
    time,
  });

  try {
    const response = await order.save();
    console.log(response);
    nodeMailer(order);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json({ Error: error });
  }
});

module.exports = router;
