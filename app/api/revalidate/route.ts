import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    revalidatePath("/", "layout");
    revalidatePath("/blog", "layout");

    return NextResponse.json({
      revalidated: true,
      message: "Cache cleared successfully (30m cycle reset)",
      now: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { revalidated: false, error: String(error) },
      { status: 500 }
    );
  }
}

