import { once } from "node:events";
import { createServer } from "node:http";
import {
  redisGetValue,
  redisSetValue,
  sqliteGetValue,
  sqliteSetValue,
} from "./cache-db/index.ts";

export const server = createServer(async (req, res) => {
  try {
    const url = new URL(req?.url || "", `http://${req.headers.host}`);
    const route = url.pathname;

    // Verifica se a rota é para SQLite ou Redis
    const isSqlite = route.startsWith("/sqlite");
    const isRedis = route.startsWith("/redis");

    if (!isSqlite && !isRedis) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Rota não encontrada" }));
    }

    if (req.method === "GET") {
      const params = Object.fromEntries(url.searchParams.entries());
      const dataHandle: Record<string, unknown> = {};

      // Para cada chave passada na query string, chama a função apropriada
      for (const key of Object.keys(params)) {
        const keyValue = key.replace("?", "").replace("/", "");
        if (isSqlite) {
          dataHandle[keyValue] = await sqliteGetValue(keyValue);
        } else if (isRedis) {
          dataHandle[keyValue] = await redisGetValue(keyValue);
        }
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(dataHandle));
    }

    if (req.method === "POST") {
      const result = (await once(req, "data")).toString();
      const data = JSON.parse(result);

      if (!data.key || !data.value) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Chave ou valor inválido" }));
      }

      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      let item: any | null = null;
      if (isSqlite) {
        sqliteSetValue({ key: data.key, value: data.value, expiresAt: 5 });
        item = await sqliteGetValue(data.key);
      } else if (isRedis) {
        redisSetValue({ key: data.key, value: data.value, expiresAt: 5 });
        item = await redisGetValue(data.key);
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify(item ? { key: item.key, value: item.value } : null),
      );
    }

    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Método não permitido" }));
  } catch (error) {
    console.error("Error processing request:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
});
