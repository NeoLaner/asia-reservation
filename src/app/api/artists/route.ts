import { ArtistsData, artistService } from "@/app/services/artistsService";
import { ResponseTypeGen } from "@/utils/customRespone";
import { catchErrorResponse } from "@/utils/errorHandler";

const { getAllArtists } = artistService();

export async function GET() {
  try {
    // Fetch all salons
    const salons = await getAllArtists();

    // Check if the salons array is empty
    if (!salons || salons.length === 0) {
      return Response.json({ error: "No salons found" }, { status: 404 });
    }

    // Return the salons data
    return Response.json(salons);
  } catch (error) {
    // Error handling
    return catchErrorResponse(error);
  }
}

export type ArtistsResponse = ResponseTypeGen<ArtistsData>;
