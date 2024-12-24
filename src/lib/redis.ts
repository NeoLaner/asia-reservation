import Redis from "ioredis";

let redis: Redis | null = null;

export function createRedis() {
  if (!redis) {
    redis = new Redis({
      retryStrategy() {
        // Reconnect after 5 seconds
        return 3000;
      },
    });
    redis.on("error", (error) => {
      console.error("Redis error", error);
    });
    return redis;
  } else return redis;
}
