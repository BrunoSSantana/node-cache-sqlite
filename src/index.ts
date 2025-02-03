import { redisCacheSetup, sqliteCacheSetup } from "./cache-db";
import { server } from "./server";

sqliteCacheSetup();
redisCacheSetup();

server.listen(3000, () =>
  console.log("Server running on port http://localhost:3000"),
);
