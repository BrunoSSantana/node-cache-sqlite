import { createClient } from "redis";

// Cria um cliente Redis
const redisClient = createClient();

redisClient.on("error", (err) => console.error("Redis Client Error", err));

await redisClient.connect();

export async function cacheSetup() {
	console.log("Redis cache setup complete");
}

export async function getValue(key) {
	const value = await redisClient.get(key);

	return value ? JSON.parse(value) : null;
}

export async function setValue({ key, value, expiresAt }) {
	await redisClient.set(key, JSON.stringify(value), {
		EX: expiresAt * 60,
	});
}
