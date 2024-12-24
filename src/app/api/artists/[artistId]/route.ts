// import files
import { ArtistData, artistService } from "@/app/services/artistsService";
import { responseGen, ResponseTypeGen } from "@/utils/customRespone";
import { catchErrorResponse } from "@/utils/errorHandler";

// import packages
import { NextRequest } from "next/server";
import { z } from "zod";

//extract out the service methods
const { getArtistById } = artistService();

// define schema for validating params or request.body object
const paramsSchema = z.object({
  artistId: z.string(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ artistId: string }> },
) {
  try {
    //1) validation
    const validatedParams = paramsSchema.parse(await params);

    //2) handler - just used for getting and sending data to redis and rabbit
    const data = await getArtistById(validatedParams.artistId);

    //3) response
    // if data is null or an empty object return 404
    if (!data || Object.keys(data).length === 0)
      return responseGen().responseNotFound();
    //if is everything is ok
    return responseGen().responseOk(data);
  } catch (error) {
    //error handling
    return catchErrorResponse(error);
  }
}

export type ArtistResponse = ResponseTypeGen<ArtistData>;
