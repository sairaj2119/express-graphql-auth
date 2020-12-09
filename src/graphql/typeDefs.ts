import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type JwtToken {
    token: String!
  }
  type Query {
    hello: String
  }
  type Mutation {
    register(username: String, email: String, password: String): JwtToken!
    login(email: String, password: String): String
  }
`;
