import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ data, error: null }, { status });
}

export function apiError(error: unknown, status = 500) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        data: null,
        error: {
          message: "Validation failed",
          details: error.flatten()
        }
      },
      { status: 422 }
    );
  }

  const message = error instanceof Error ? error.message : "Unexpected error";

  return NextResponse.json(
    {
      data: null,
      error: { message }
    },
    { status }
  );
}
