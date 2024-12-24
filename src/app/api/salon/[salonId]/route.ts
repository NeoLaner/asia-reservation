// import files
import { salonService } from "@/app/services/salonService";
import { createErrorResponse } from "@/utils/errorHandler";

// import packages
import { NextRequest } from "next/server";
import { z } from "zod";

//extract out the service methods
const { getSalonById } = salonService();

// define schema for validating params or request.body object
const paramsSchema = z.object({
  salonId: z.string(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ salonId: string }> },
) {
  try {
    //1) validation
    const validatedParams = paramsSchema.parse(await params);

    //2) handler (just used for getting and sending data to redis and rabbit)
    const data = getSalonById(validatedParams.salonId);

    //3) response
    // if data is null or an empty object return 404
    if (!data || Object.keys(data).length === 0)
      return Response.json({ error: "salon not found" }, { status: 404 });
    //if is everything is ok
    return Response.json(data);
  } catch (error) {
    //error handling
    return createErrorResponse(error);
  }
}
