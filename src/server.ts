import { once } from "node:events";
import { createServer } from "node:http";
import { sqliteGetValue, sqliteSetValue } from "./cache-db/index.ts";

export const server = createServer(async (req, res) => {
  try {
    if (req.method === "GET") {
      const url = new URL(req?.url || "", `http://${req.headers.host}`);
      const params = Object.fromEntries(url.searchParams.entries());

      const dataHandle = {};
      for (const key of Object.keys(params)) {
        const keyValue = key.replace("?", "").replace("/", "");

        dataHandle[keyValue] = await sqliteGetValue(keyValue);
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(dataHandle));
    }

    if (req.method === "POST") {
      const result = (await once(req, "data")).toString();
      const data = JSON.parse(result);

      if (!data.key || !data.value) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Invalid key or value" }));
      }

      sqliteSetValue({ key: data.key, value: data.value, expiresAt: 5 });

      const item = await sqliteGetValue(data.key);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify(item ? { key: item.key, value: item.value } : null),
      );
    }

    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Method Not Allowed" }));
  } catch (error) {
    console.error("Error processing request:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
});
