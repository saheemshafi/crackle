import { ImageResponse } from "@vercel/og";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const width = url.searchParams.get("width");
  const height = url.searchParams.get("height");
  const image = url.searchParams.get("path");
  const hello = url.searchParams.get("hello");

  if (!image || !width || !height) {
    return NextResponse.json({
      success: false,
      error: "Provide a url,width and height",
    });
  }
  return new ImageResponse(
    (
      <img
        src={`https://image.tmdb.org/t/p/original/${image}.jpg`}
        width={width}
        height={height}
      />
    ),
    {
      width: parseInt(width),
      height: parseInt(height),
      headers: {
        "Content-Disposition": "attachment;filename=crackle-poster.jpg",
      },
    }
  );
}
