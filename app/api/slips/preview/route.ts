import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getMatchCountPreview } from "@/lib/matchFilter";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { competitions, markets, frequency, scope } = body;

    if (!competitions || !markets || !frequency || !scope) {
      return NextResponse.json(
        { error: "Missing required strategy parameters" },
        { status: 400 }
      );
    }

    const preview = getMatchCountPreview({
      competitions,
      markets,
      frequency,
      scope,
    });

    return NextResponse.json(preview);
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
export async function GET(request: Request) {
  // Support GET by parsing URL search params as requested in architecture context
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const competitions = searchParams.get("competitions")?.split(",") || [];
  const markets = searchParams.get("markets")?.split(",") || [];
  const frequency = (searchParams.get("frequency") || "4_of_last_5") as any;
  const scope = (searchParams.get("scope") || "both") as any;

  const preview = getMatchCountPreview({
    competitions,
    markets,
    frequency,
    scope,
  });

  return NextResponse.json(preview);
}
