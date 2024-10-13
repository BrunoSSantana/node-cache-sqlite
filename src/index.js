import { cacheSetup } from "./cache-db.js";
import { server } from "./server.js";

cacheSetup();

server.listen(3000, () =>
	console.log("Server running on port http://localhost:3000"),
);
