import { once } from "node:events";
import { createServer } from "node:http";
import {
  redisGetValue,
  redisSetValue,
  sqliteInDiskCacheSetup,
  sqliteInMemoryCacheSetup,
  sqliteInDiskGetValue,
  sqliteInMemoryGetValue,
} from "./cache-db/index.ts";

// Inicializa os bancos SQLite em disco e em memória
sqliteInDiskCacheSetup();
sqliteInMemoryCacheSetup();

export const server = createServer(async (req, res) => {
  try {
    const url = new URL(req?.url || "", `http://${req.headers.host}`);
    const route = url.pathname;

    // Verifica se a rota corresponde a um dos caches SQLite ou Redis
    const isSqliteInDisk = route.startsWith("/sqlite-in-disk");
    const isSqliteInMemory = route.startsWith("/sqlite-in-memory");
    const isRedis = route.startsWith("/redis");

    if (!isSqliteInDisk && !isSqliteInMemory && !isRedis) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Rota não encontrada" }));
    }

    if (req.method === "GET") {
      const params = Object.fromEntries(url.searchParams.entries());
      const dataHandle: Record<string, unknown> = {};

      for (const key of Object.keys(params)) {
        const keyValue = key.replace("?", "").replace("/", "");
        if (isSqliteInDisk) {
          dataHandle[keyValue] = await sqliteInDiskGetValue(keyValue);
        } else if (isSqliteInMemory) {
          dataHandle[keyValue] = await sqliteInMemoryGetValue(keyValue);
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
      if (isSqliteInDisk) {
        sqliteInDiskCacheSetup(); // Garante que o setup foi feito
        item = await sqliteInDiskGetValue(data.key);
      } else if (isSqliteInMemory) {
        sqliteInMemoryCacheSetup(); // Garante que o setup foi feito
        item = await sqliteInMemoryGetValue(data.key);
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
