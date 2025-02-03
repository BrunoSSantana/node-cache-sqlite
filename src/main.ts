import { redisCacheSetup } from "./cache-db/cache-redis-db.ts";
import { sqliteCacheSetup } from "./cache-db/cache-sqlite-db.ts";
import { server } from "./server.ts";
const PORT = 3001;

sqliteCacheSetup();
redisCacheSetup();

server.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`),
);
