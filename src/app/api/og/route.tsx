import { ImageResponse } from "@vercel/og";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const width = url.searchParams.get("width");
  const height = url.searchParams.get("height");
  const image = url.searchParams.get("path");
  const extension = url.searchParams.get("ext");
  console.log(extension)

  if (!image || !width || !height || !extension) {
    return NextResponse.json(
      {
        success: false,
        error: "Provide a url, width, height and image extension",
      },
      { status: 422 }
    );
  }
  return new ImageResponse(
    (
      <img
        src={`https://image.tmdb.org/t/p/original/${image}.${extension}`}
        width={width}
        height={height}
      />
    ),
    {
      width: parseInt(width),
      height: parseInt(height),
      headers: {
        "Content-Disposition": `attachment;`,
      },
    }
  );
}
