import { MockFixture, MOCK_FIXTURES } from "./mockFixtures";

export interface H2HOptions {
  enabled: boolean;
  threshold: "2_of_last_3" | "3_of_last_5" | "4_of_last_5";
}

export interface FilterOptions {
  competitions: string[]; // e.g. ["EPL", "LaLiga"]
  markets: string[]; // e.g. ["Over 2.5", "BTTS"]
  frequency: "3_of_last_5" | "4_of_last_5" | "4_of_last_6" | "5_of_last_6";
  scope: "home" | "away" | "both";
  h2h?: H2HOptions;
}

export interface FilteredFixture {
  fixture: MockFixture;
  confidenceScore: number;
  confidenceLevel: "Strong" | "Moderate" | "Borderline";
  details: {
    market: string;
    homeStat: string;
    awayStat: string;
  }[];
}

export interface MatchCountPreview {
  count: number;
  isAllowed: boolean;
  message: string;
}

// Parse H2H threshold string into required count and total limit
export function parseH2HThreshold(threshold: string): { requiredCount: number; totalLimit: number } {
  switch (threshold) {
    case "2_of_last_3":
      return { requiredCount: 2, totalLimit: 3 };
    case "3_of_last_5":
      return { requiredCount: 3, totalLimit: 5 };
    case "4_of_last_5":
      return { requiredCount: 4, totalLimit: 5 };
    default:
      return { requiredCount: 3, totalLimit: 5 };
  }
}

/**
 * Checks if a specific total goals satisfies a market.
 */
export function checkMarketCondition(goals: number, market: string): boolean {
  switch (market) {
    case "Over 1.5":
      return goals >= 2;
    case "Over 2.5":
      return goals >= 3;
    case "Under 2.5":
      return goals < 3;
    case "BTTS":
      // For mock historical matches, we define it as true for 2, 3, or 5+ goals.
      return goals === 2 || goals === 3 || goals >= 5;
    default:
      return false;
  }
}

/**
 * Parse frequency string into requiredCount and totalLimit.
 */
export function parseFrequency(freq: string): { requiredCount: number; totalLimit: number } {
  switch (freq) {
    case "3_of_last_5":
      return { requiredCount: 3, totalLimit: 5 };
    case "4_of_last_5":
      return { requiredCount: 4, totalLimit: 5 };
    case "4_of_last_6":
      return { requiredCount: 4, totalLimit: 6 };
    case "5_of_last_6":
      return { requiredCount: 5, totalLimit: 6 };
    default:
      return { requiredCount: 4, totalLimit: 5 }; // Fallback default
  }
}

/**
 * Filter team's form array based on scope and return goals.
 * Positive values in form represent home matches, negative represent away matches.
 */
export function filterFormByScope(
  formArray: number[],
  scope: "home" | "away" | "both",
  isHomeTeam: boolean
): number[] {
  return formArray
    .map((val) => {
      const goals = Math.abs(val);
      const isHomeMatch = val >= 0;

      if (scope === "both") {
        return { goals, matchesScope: true };
      }

      if (scope === "home") {
        // Home team -> home matches; Away team -> away matches
        const matchesScope = isHomeTeam ? isHomeMatch : !isHomeMatch;
        return { goals, matchesScope };
      }

      if (scope === "away") {
        // Home team -> away matches; Away team -> home matches
        const matchesScope = isHomeTeam ? !isHomeMatch : isHomeMatch;
        return { goals, matchesScope };
      }

      return { goals, matchesScope: false };
    })
    .filter((item) => item.matchesScope)
    .map((item) => item.goals);
}

/**
 * Evaluate form for a single team.
 */
export function evaluateTeamForm(
  formArray: number[],
  market: string,
  scope: "home" | "away" | "both",
  isHomeTeam: boolean,
  requiredCount: number,
  totalLimit: number
): { satisfies: boolean; ratio: number; displayStat: string } {
  const filteredGoals = filterFormByScope(formArray, scope, isHomeTeam);
  
  // Take the most recent matches (last elements of the array)
  const matchesToEvaluate = filteredGoals.slice(-totalLimit);

  if (matchesToEvaluate.length < requiredCount) {
    return {
      satisfies: false,
      ratio: 0,
      displayStat: `0/${matchesToEvaluate.length} (0%)`
    };
  }

  const satisfyingCount = matchesToEvaluate.filter((goals) =>
    checkMarketCondition(goals, market)
  ).length;

  const satisfies = satisfyingCount >= requiredCount;
  const ratio = satisfyingCount / matchesToEvaluate.length;
  const percentage = Math.round(ratio * 100);

  return {
    satisfies,
    ratio,
    displayStat: `${satisfyingCount}/${matchesToEvaluate.length} (${percentage}%)`
  };
}

/**
 * Evaluate H2H form for a fixture.
 * Checks if the required number of recent H2H matches satisfy the market condition.
 */
export function evaluateH2H(
  h2h: Array<{ homeGoals: number; awayGoals: number }>,
  market: string,
  requiredCount: number,
  totalLimit: number
): { satisfies: boolean; displayStat: string } {
  if (h2h.length === 0) return { satisfies: false, displayStat: "0/0 (0%)" };

  const recent = h2h.slice(-totalLimit);

  if (recent.length < requiredCount) {
    return { satisfies: false, displayStat: `0/${recent.length} (0%)` };
  }

  const satisfyingCount = recent.filter((match) => {
    const totalGoals = match.homeGoals + match.awayGoals;
    const btts = match.homeGoals > 0 && match.awayGoals > 0;
    return checkMarketCondition(totalGoals, market) && (market !== "BTTS" || btts);
  }).length;

  const satisfies = satisfyingCount >= requiredCount;
  const percentage = Math.round((satisfyingCount / recent.length) * 100);
  return {
    satisfies,
    displayStat: `${satisfyingCount}/${recent.length} (${percentage}%)`,
  };
}

/**
 * Main Filtering Engine.
 */
export function filterFixtures(options: FilterOptions): FilteredFixture[] {
  const { competitions, markets, frequency, scope, h2h } = options;

  if (competitions.length === 0 || markets.length === 0) {
    return [];
  }

  const { requiredCount, totalLimit } = parseFrequency(frequency);
  const results: FilteredFixture[] = [];

  for (const fixture of MOCK_FIXTURES) {
    // 1. Filter by competition
    if (!competitions.includes(fixture.competition)) {
      continue;
    }

    // 2. Evaluate all active markets (AND logic)
    let allMarketsSatisfied = true;
    const marketDetails: FilteredFixture["details"] = [];
    let totalScoreSum = 0;

    for (const market of markets) {
      // Evaluate current/predicted stats for upcoming fixture
      const fixtureSatisfiesMarket = checkMarketCondition(
        fixture.stats.totalGoals,
        market
      ) && (market !== "BTTS" || fixture.stats.btts);

      if (!fixtureSatisfiesMarket) {
        allMarketsSatisfied = false;
        break;
      }

      // Evaluate historical form for home team
      const homeEval = evaluateTeamForm(
        fixture.form.home,
        market,
        scope,
        true,
        requiredCount,
        totalLimit
      );

      // Evaluate historical form for away team
      const awayEval = evaluateTeamForm(
        fixture.form.away,
        market,
        scope,
        false,
        requiredCount,
        totalLimit
      );

      if (!homeEval.satisfies || !awayEval.satisfies) {
        allMarketsSatisfied = false;
        break;
      }

      marketDetails.push({
        market,
        homeStat: homeEval.displayStat,
        awayStat: awayEval.displayStat
      });

      // Average ratio for this market
      totalScoreSum += (homeEval.ratio + awayEval.ratio) / 2;
    }

    if (!allMarketsSatisfied || marketDetails.length === 0) {
      continue;
    }

    // 3. Evaluate H2H filter (if enabled)
    if (h2h?.enabled) {
      const { requiredCount: h2hRequired, totalLimit: h2hTotal } = parseH2HThreshold(h2h.threshold);
      let h2hPasses = true;

      for (const market of markets) {
        const h2hResult = evaluateH2H(fixture.h2h, market, h2hRequired, h2hTotal);
        if (!h2hResult.satisfies) {
          h2hPasses = false;
          break;
        }
      }

      if (!h2hPasses) {
        continue;
      }
    }

    const confidenceScore = totalScoreSum / markets.length;
    
    let confidenceLevel: FilteredFixture["confidenceLevel"] = "Borderline";
    if (confidenceScore >= 0.8) {
      confidenceLevel = "Strong";
    } else if (confidenceScore >= 0.6) {
      confidenceLevel = "Moderate";
    }

    results.push({
      fixture,
      confidenceScore,
      confidenceLevel,
      details: marketDetails
    });
  }

  // Sort by confidence score descending
  return results.sort((a, b) => b.confidenceScore - a.confidenceScore);
}

/**
 * Return preview analytics.
 */
export function getMatchCountPreview(options: FilterOptions): MatchCountPreview {
  const filtered = filterFixtures(options);
  const count = filtered.length;

  if (count >= 8) {
    return {
      count,
      isAllowed: true,
      message: `Great! Found ${count} matching fixtures (showing top 8).`
    };
  } else if (count >= 4) {
    return {
      count,
      isAllowed: true,
      message: `Only ${count} matches found. You can proceed or adjust filters.`
    };
  } else if (count >= 2) {
    return {
      count,
      isAllowed: true,
      message: `Low match volume (${count} matches found). Consider adjusting filters.`
    };
  } else {
    return {
      count,
      isAllowed: false,
      message: `Not enough matches (${count} found). Adjust filters.`
    };
  }
}
