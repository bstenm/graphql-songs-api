import { request } from "graphql-request";
import fetch from 'node-fetch';
import { port } from "./config";
import server from "./server";

jest.mock('node-fetch');

fetch.mockImplementation(() => new Promise(resolve1 => {
      resolve1({
            json: () => new Promise(resolve2 => {
                  resolve2({
                        toptracks: {
                              track: [{
                                    artist: {
                                          name: "jamiroquai",
                                    },
                                    image: [
                                          {"'#text": "http://small-image" },
                                          { "#text": "http://medium-image'" },
                                          { "#text": "http://large-image'" },
                                    ],
                                    name: "Title 1",
                              }, {
                                    artist: {
                                          name: "Jamiroquai",
                                    },
                                    image: [
                                          {"'#text": "http://small-image" },
                                          { "#text": "http://medium-image'" },
                                          { "#text": "http://large-image'" },
                                    ],
                                    name: "Title 2",
                              }],
                        },
                  });
            }),
      });
}));

const host: string = `http://127.0.0.1:${port}`;

beforeAll(async () => {
      await server.start({ port });
});

it("Returns the whole list of songs", async () => {
      const query = "query { songs(artist: \"jamiroquai\") { title } }";
      const response = await request(host, query);

      expect(response).toEqual({ songs:  [{ title: "Title 1"}, { title: "Title 2"}]});
});

it("Returns only the first nb of songs if number specified", async () => {
      const query = "query { songs(artist: \"jamiroquai\", nb: 1) { title, artist } }";
      const response = await request(host, query);

      expect(response).toEqual({ songs:  [{ title: "Title 1", artist: "jamiroquai" }]});
});

it("Returns an error message if artist not found", async () => {
      try {
            fetch.mockImplementation(() => new Promise(resolve1 => {
                  resolve1({
                        json: () => new Promise(resolve2 => {
                              resolve2({
                                    toptracks: null,
                              })
                        }),
                  });
            }));

            const query = "query { songs(artist: \"james+brown\", nb: 1) { title, artist } }";
            await request(host, query);
      } catch ({ response }) {
            expect(response.errors[0].message).toEqual('Unknown Artist');
      }
});
