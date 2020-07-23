const { gql } = require('apollo-server-express');

const typeDefs = gql`
  
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

module.exports = typeDefs;
