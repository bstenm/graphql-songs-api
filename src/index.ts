import { port } from "./config";
import server from "./server";

server.start({ port }, () => {
      // tslint:disable-next-line:no-console
      console.log(`Server is running on port:${port}`);
});
