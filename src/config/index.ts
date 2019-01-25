import {lastFM  } from './credentials';

export const port: string = process.env.PORT || (process.env.NODE_ENV === "test" ? "5000" : "4000");
export const lastFmBaseUrl: string = `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&api_key=${lastFM.apiKey}&format=json&artist=`;