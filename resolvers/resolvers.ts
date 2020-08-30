/* eslint-disable no-console */
import nodeMailer from '../utils/clientMailer';
import OrderModel from '../models/OrderModel';
import { IResolvers } from 'graphql-tools'
import Order from '../schema/Order-type'

const resolvers: IResolvers = {
  Query: {
    orders: async (obj, args, context) => {
      try {
        const orderList: any = await OrderModel.find();
        console.log(orderList);
        return orderList;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
    singleOrder: async (obj, { id }, context) => {
      try {
        const singleOrder: any = await OrderModel.findOne({ _id: id });
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
        const newOrder: any = await OrderModel.create({
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
        const removeOrder: any = await OrderModel.deleteOne({ _id: id });
        return { message: `${id} was removed.` };
      } catch (error) {
        console.log(error);
        return [];
      }
    },
    updateOrder: async (obj, { order, id }, context) => {

      try {
        const updatedOrder: any = await Promise.all([
          OrderModel.updateOne({ _id: id }, order),
          OrderModel.findOne({ _id: id }),
        ]);
        nodeMailer(updatedOrder[1]); // this is temporaary.
        return updatedOrder[1];
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  },
};

export default resolvers;
