import { createClient } from "redis";

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

// Evento de erro
redisClient.on("error", (err) => console.error("❌ Redis Client Error:", err));

/**
 * Conecta ao Redis
 */
export async function redisCacheSetup() {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log("✅ Redis cache setup complete");
    }
  } catch (error) {
    console.error("❌ Failed to connect to Redis:", error);
  }
}

/**
 * Obtém um valor do cache Redis
 * @param {string} key - Chave do cache
 * @returns {Promise<unknown>} - Valor armazenado ou null
 */
export async function redisGetValue(key: string): Promise<unknown> {
  try {
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`❌ Error retrieving key "${key}" from Redis:`, error);
    return null;
  }
}

/**
 * Define um valor no cache Redis com tempo de expiração
 * @param {Object} param0 - Objeto contendo key, value e expiresAt (em minutos)
 * @returns {Promise<void>}
 */
export async function redisSetValue({
  key,
  value,
  expiresAt = 5,
}): Promise<void> {
  try {
    await redisClient.set(key, JSON.stringify(value), {
      EX: expiresAt * 60, // Tempo de expiração em segundos
    });
  } catch (error) {
    console.error(`❌ Error setting key "${key}" in Redis:`, error);
  }
}
