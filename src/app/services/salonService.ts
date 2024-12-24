import { createRedis } from "@/lib/redis";

export function salonService() {
  //create redis once at top of module
  const redis = createRedis();
  console.log("Redis listener count:", redis.listenerCount("error"));
  if (redis.listenerCount("error") > 1)
    console.log("🔥🔥🔥🔥🔥 WARNING a nasty bug detected!!!");

  //methods
  async function getSalonById(salonId: string) {
    const data = await redis?.call("JSON.GET", `salon:${salonId}`);
    return data;
  }

  async function getAllSalons() {
    const data = await redis?.call("JSON.GET", `salon:$`);
    return data;
  }

  return { getSalonById, getAllSalons };
}

type SalonService = ReturnType<typeof salonService>;
export type SalonData = Awaited<ReturnType<SalonService["getSalonById"]>>;
export type SalonsData = Awaited<ReturnType<SalonService["getAllSalons"]>>;
