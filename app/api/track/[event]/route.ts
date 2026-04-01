import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  context: { params: Promise<{ event: string }> }
) {
  try {
    const { event } = await context.params;

    let body: any = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    console.log("TRACK_EVENT", {
      event,
      body,
      time: new Date().toISOString(),
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: "track failed" }, { status: 500 });
  }
}