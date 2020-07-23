/* eslint-disable no-console */
const nodeMailer = require('../utils/clientMailer');
const OrderModel = require('../models/OrderModel');

const resolvers = {
  Query: {
    orders: async () => {
      try {
        const orderList = await OrderModel.find();
        console.log(orderList);
        return orderList;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
    singleOrder: async (obj, { id }) => {
      try {
        const singleOrder = await OrderModel.findOne({ _id: id });
        return singleOrder;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  },

  Mutation: {
    addOrder: async (obj, { order }) => {
      try {
        const newOrder = await OrderModel.create({
          ...order,
        });
        nodeMailer(newOrder);
        return newOrder;
      } catch (error) {
        console.log(error);
        return [];
      }
    },

    removeOrder: async (obj, { id }) => {
      try {
        const removeOrder = await OrderModel.deleteOne({ _id: id });
        return { message: `${id} was removed.` };
      } catch (error) {
        console.log(error);
        return [];
      }
    },
    updateOrder: async (obj, args) => {
      const { order, id } = args;
      try {
        const updatedOrder = await Promise.all([
          OrderModel.updateOne({ _id: id }, order),
          OrderModel.findOne({ _id: id }),
        ]);
        return updatedOrder[1];
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  },
};

module.exports = resolvers;
