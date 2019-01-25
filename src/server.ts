import fetch from 'node-fetch';
import { GraphQLServer } from "safe-graphql-yoga";
import { lastFmBaseUrl } from './config';

const typeDefs = `
      type Query {
            songs(artist: String!, nb: Int): [Song!]!
      }
      type Song {
            id: ID!
            title: String!
            artist: String!
            image: Image
      }
      type Image {
            small: String
            large: String
      }
`;

const resolvers = {
      Query: {
            songs: async (_: any, { artist, nb }) => {
                  const apiUrl = `${lastFmBaseUrl}${artist}`;
                  const lastFmResponse = await fetch(apiUrl);
                  const lastFmData = await lastFmResponse.json();
                  const { toptracks } = lastFmData;

                  if (!toptracks) {
                        throw new Error('Unknown Artist');
                  }

                  // get only the number of tracks requested
                  const tracks = nb ? toptracks.track.slice(0, nb) : toptracks.track;

                  // return
                  return tracks.map(e => ({
                        artist: e.artist.name,
                              image: {
                                    large: e.image[2]['#text'],
                                    small: e.image[0]['#text'],
                              },
                        title: e.name,
                  }));
            },
      },
};

export default new GraphQLServer({ typeDefs, resolvers });
