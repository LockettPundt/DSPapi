import nodeMailer from '../utils/clientMailer';
import OrderModel from '../models/OrderModel';
import { IResolvers, } from 'graphql-tools'
import { gql } from 'apollo-server-express';


export const orderTypes = gql`
  
  type Order {
    id: ID
    firstName: String!
    lastName: String!
    email: String!
    dateCreated: String
    jobDate: String!
    services: [String]!
    acceptTerms: Boolean
    time: String!
    phone: String!
  }
  
  input OrderInput {
    id: ID
    firstName: String!
    lastName: String!
    email: String!
    dateCreated: String
    jobDate: String!
    services: [String]!
    acceptTerms: Boolean
    time: String!
    phone: String!
  }
  
  type removedOrder {
    message: String
  }
  
  type Query {
    orders: [Order],
    singleOrder(id: ID): Order,
  }
  
  type Mutation {
    addOrder(order: OrderInput): Order,
    removeOrder(id: ID): removedOrder,
    updateOrder(id: ID!, order: OrderInput!): Order,
  }
`;

export interface Order {
  email: string,
  firstName: string,
  lastName: string
  id: string,
  time: string,
  jobDate: string,
  services?: [string],
}


export const orderResolvers: IResolvers = {
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