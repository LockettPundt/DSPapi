const express = require('express');
const OrderModel = require('../models/OrderModel');

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
  const response = await OrderModel.find();
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

  } = req.body;
  const newOrder = new OrderModel({
    firstName,
    lastName,
    email,
    dateCreated,
    jobDate,
    terms: true,
    services,
  });
  try {
    const response = await newOrder.save();
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json({ Error: error });
  }
});

module.exports = router;
