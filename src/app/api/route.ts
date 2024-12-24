import { createRedis } from "@/lib/redis";
import { z } from "zod";

export async function GET() {
  try {
    const redis = createRedis();
    const data = await redis.call("JSON.GET", "test");
    if (data) return Response.json(data);
    return Response.json({ error: "User not found" }, { status: 404 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.errors }, { status: 400 });
    } else {
      console.error(error);
      return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
}
