import Redis from "ioredis";

export function bugDetector(redis: Redis) {
  console.log("Redis listener count:", redis.listenerCount("error"));
  if (redis.listenerCount("error") > 1)
    console.log("🔥🔥🔥🔥🔥 WARNING a nasty bug detected!!!");
}
