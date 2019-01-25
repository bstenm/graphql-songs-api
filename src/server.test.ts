import { request } from "graphql-request";
import { port } from "./config";
import server from "./server";

jest.mock('./mock-data', () => [
      {
            album: 'Album 1',
            artist: 'Artist 1',
            id: 1,
            title: 'Title 1',
            year: 1968,
      },
      {
            album: 'Album 2',
            artist: 'Artist 2',
            id: 2,
            title: 'Title 2',
            year: 1994,
      },
]);

const host: string = `http://127.0.0.1:${port}`;

beforeAll(async () => {
      await server.start({ port });
});

it("Returns the whole list of songs", async () => {
      const query = "query { songs { title } }";
      const response = await request(host, query);
      expect(response).toEqual({ songs:  [{ title: "Title 1"}, { title: "Title 2"}]});
});

it("Returns the list of songs filtered accdoring to input", async () => {
      const query = "query { songs (where: { year: 1968 }) { title, artist } }";
      const response = await request(host, query);
      expect(response).toEqual({ songs:  [{ title: "Title 1", artist: "Artist 1" }]});
});
