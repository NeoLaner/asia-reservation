import { NextResponse } from "next/server";
import { z } from "zod";

export function catchErrorResponse(error: unknown) {
  //if there is validation error return zod error messages
  if (error instanceof z.ZodError) {
    return NextResponse.json({ error: error.errors }, { status: 400 });
  } else {
    //otherwise log an error and send generic response to user
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
