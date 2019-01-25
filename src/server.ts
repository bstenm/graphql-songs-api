import filter from 'lodash/filter';
import { GraphQLServer } from "safe-graphql-yoga";
import data from './mock-data';

const typeDefs = `
      type Query {
            songs(where: UserInput): [Song!]!
      }
      type Song {
            id: ID!
            title: String!
            artist: String!
            album: String!
            year: Int!
      }
      input UserInput {
            year: Int
            artist: String
      }
`;

const resolvers = {
      Query: {
            songs: (_: any, { where }) =>
                  where ? filter(data, where) : data,
      },
};

export default new GraphQLServer({ typeDefs, resolvers });



