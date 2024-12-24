import { createRedis } from "@/lib/redis";
import { bugDetector } from "@/utils/bugDetector";
import { Artist } from "../api/@types/RedisSalonData";

//services just used for handling data on redis
export function artistService() {
  //create redis once at top of the module
  //properties
  const redis = createRedis();
  bugDetector(redis);

  //methods
  async function getArtistById(ArtistId: string) {
    const data = (await redis.call(
      "JSON.GET",
      `models.Artists:${ArtistId}`,
    )) as string;
    return JSON.parse(data) as Artist;
  }

  async function getAllArtists() {
    //get all keys of model form redis
    const keys = await redis.keys("models.Artists:*");

    // Fetch JSON data for each key
    const artists = [];
    for (const key of keys) {
      const data = (await redis.call("JSON.GET", key)) as string;
      artists.push(JSON.parse(data));
    }

    return artists as Artist[];
  }

  return { getArtistById, getAllArtists };
}

//types generator
type ArtistService = ReturnType<typeof artistService>;
export type ArtistData = Awaited<ReturnType<ArtistService["getArtistById"]>>;
export type ArtistsData = Awaited<ReturnType<ArtistService["getAllArtists"]>>;
