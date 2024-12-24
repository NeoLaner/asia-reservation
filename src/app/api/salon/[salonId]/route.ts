// import files
import { salonService } from "@/app/services/salonService";
import { createErrorResponse } from "@/utils/errorHandler";

// import packages
import { NextRequest } from "next/server";
import { z } from "zod";

const { getSalonById } = salonService();

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

    //2) handler
    const data = getSalonById(validatedParams.salonId);

    //3) response
    // if data is null or an empty object
    if (!data || Object.keys(data).length === 0)
      return Response.json({ error: "salon not found" }, { status: 404 });
    return Response.json(data);
  } catch (error) {
    return createErrorResponse(error);
  }
}
