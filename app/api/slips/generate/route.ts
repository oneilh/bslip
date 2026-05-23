import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { filterFixtures } from "@/lib/matchFilter";

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

    const filtered = filterFixtures({
      competitions,
      markets,
      frequency,
      scope,
    });

    const finalMatches = filtered.slice(0, 8);

    if (finalMatches.length < 2) {
      return NextResponse.json(
        { error: "Not enough matches to generate a slip. Minimum is 2." },
        { status: 400 }
      );
    }

    // In a complete implementation, this would insert rows into `slips` and `legs` and deduct credits.
    // For Phase 1, we return the structured slip client-side.
    const slipId = Math.random().toString(36).substring(2, 11);
    
    // Evaluate overall confidence level:
    // If all legs are strong -> Strong. If any is borderline -> Borderline. Otherwise Moderate.
    const hasBorderline = finalMatches.some((m) => m.confidenceLevel === "Borderline");
    const allStrong = finalMatches.every((m) => m.confidenceLevel === "Strong");
    const overallConfidence = allStrong
      ? "Strong"
      : hasBorderline
      ? "Borderline"
      : "Moderate";

    const slip = {
      id: slipId,
      userId: user.id,
      createdAt: new Date().toISOString(),
      legs: finalMatches.map((item) => ({
        id: item.fixture.id,
        competition: item.fixture.competition,
        homeTeam: item.fixture.homeTeam,
        awayTeam: item.fixture.awayTeam,
        date: item.fixture.date,
        confidenceLevel: item.confidenceLevel,
        confidenceScore: item.confidenceScore,
        details: item.details,
      })),
      totalLegs: finalMatches.length,
      overallConfidence,
    };

    return NextResponse.json({ slip });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
