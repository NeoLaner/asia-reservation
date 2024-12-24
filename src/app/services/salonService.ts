import { createRedis } from "@/lib/redis";
import { bugDetector } from "@/utils/bugDetector";

//services just used for handling data on redis
export function salonService() {
  //create redis once at top of the module
  //properties
  const redis = createRedis();
  bugDetector(redis);

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

//types generator
type SalonService = ReturnType<typeof salonService>;
export type SalonData = Awaited<ReturnType<SalonService["getSalonById"]>>;
export type SalonsData = Awaited<ReturnType<SalonService["getAllSalons"]>>;
