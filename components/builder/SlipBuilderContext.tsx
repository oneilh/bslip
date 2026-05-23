"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { filterFixtures } from "@/lib/matchFilter";

export interface Preset {
  name: string;
  marketMode: "single" | "builder";
  markets: string[];
  frequency: "3_of_last_5" | "4_of_last_5" | "4_of_last_6" | "5_of_last_6";
  scope: "home" | "away" | "both";
}

export const PRESETS: Record<string, Preset> = {
  "Safe Acca": {
    name: "Safe Acca",
    marketMode: "single",
    markets: ["Over 1.5"],
    frequency: "4_of_last_5",
    scope: "both",
  },
  "Goals Fest": {
    name: "Goals Fest",
    marketMode: "single",
    markets: ["Over 2.5"],
    frequency: "4_of_last_6",
    scope: "both",
  },
  "Value Finder": {
    name: "Value Finder",
    marketMode: "single",
    markets: ["BTTS"],
    frequency: "3_of_last_5",
    scope: "both",
  },
  "Clean Sheet Hunt": {
    name: "Clean Sheet Hunt",
    marketMode: "single",
    markets: ["Under 2.5"],
    frequency: "4_of_last_5",
    scope: "both",
  },
  "Bet Builder Starter": {
    name: "Bet Builder Starter",
    marketMode: "builder",
    markets: ["BTTS", "Over 2.5"],
    frequency: "4_of_last_5",
    scope: "both",
  },
};

interface SlipBuilderContextType {
  competitions: string[];
  marketMode: "single" | "builder";
  markets: string[];
  frequency: "3_of_last_5" | "4_of_last_5" | "4_of_last_6" | "5_of_last_6";
  scope: "home" | "away" | "both";
  targetPicks: number;
  h2hEnabled: boolean;
  h2hThreshold: "2_of_last_3" | "3_of_last_5" | "4_of_last_5";
  activePreset: string | null;
  presetLocked: boolean;
  competitionError: string | null;

  generatedSlip: any | null;
  isGenerating: boolean;
  generationError: string | null;

  toggleCompetition: (leagueCode: string) => void;
  setMarketMode: (mode: "single" | "builder") => void;
  toggleMarket: (market: string) => void;
  setFrequency: (freq: any) => void;
  setScope: (scope: any) => void;
  setTargetPicks: (picks: number) => void;
  setH2hEnabled: (enabled: boolean) => void;
  setH2hThreshold: (threshold: "2_of_last_3" | "3_of_last_5" | "4_of_last_5") => void;
  loadPreset: (presetName: string) => void;
  clearPreset: () => void;
  applyPresetAndCustomize: (presetName: string) => void;
  loadLastFilters: () => void;
  generateSlip: () => void;
  clearSlip: () => void;
}

const SlipBuilderContext = createContext<SlipBuilderContextType | undefined>(
  undefined
);

export function SlipBuilderProvider({ children }: { children: React.ReactNode }) {
  const { user, openModal } = useAuth();

  // Primary builder state
  const [competitions, setCompetitions] = useState<string[]>(["EPL", "LaLiga", "SerieA"]);
  const [marketMode, setMarketModeState] = useState<"single" | "builder">("single");
  const [markets, setMarkets] = useState<string[]>(["Over 1.5"]);
  const [frequency, setFrequencyState] = useState<
    "3_of_last_5" | "4_of_last_5" | "4_of_last_6" | "5_of_last_6"
  >("4_of_last_5");
  const [scope, setScopeState] = useState<"home" | "away" | "both">("both");
  const [targetPicks, setTargetPicksState] = useState<number>(4);

  // H2H filter state
  const [h2hEnabled, setH2hEnabledState] = useState<boolean>(false);
  const [h2hThreshold, setH2hThresholdState] = useState<"2_of_last_3" | "3_of_last_5" | "4_of_last_5">("3_of_last_5");

  // Presets and locking
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [presetLocked, setPresetLocked] = useState(false);
  const [competitionError, setCompetitionError] = useState<string | null>(null);

  // Generation state
  const [generatedSlip, setGeneratedSlip] = useState<any | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Toggle competition: 1-3 allowed, blocks 4th
  const toggleCompetition = (leagueCode: string) => {
    if (presetLocked) return;
    setCompetitionError(null);

    setCompetitions((prev) => {
      if (prev.includes(leagueCode)) {
        // Enforce minimum 1 competition
        if (prev.length <= 1) return prev;
        return prev.filter((c) => c !== leagueCode);
      } else {
        // Enforce maximum 3 competitions
        if (prev.length >= 3) {
          setCompetitionError("Max 3 competitions. Remove one to add another.");
          return prev;
        }
        return [...prev, leagueCode];
      }
    });
  };

  // Set market mode (auth protected for "builder")
  const setMarketMode = (mode: "single" | "builder") => {
    if (presetLocked) return;
    setCompetitionError(null);

    if (mode === "builder" && !user) {
      openModal("signin");
      return;
    }

    setMarketModeState(mode);

    if (mode === "single") {
      // In single mode, keep only the first selected market or fallback to Over 1.5
      setMarkets((prev) => (prev.length > 0 ? [prev[0]] : ["Over 1.5"]));
    }
  };

  // Toggle selected market (auth-gated if selecting > 1 in builder)
  const toggleMarket = (market: string) => {
    if (presetLocked) return;
    setCompetitionError(null);

    if (marketMode === "single") {
      setMarkets([market]);
    } else {
      // Builder Mode: multi-selection
      setMarkets((prev) => {
        if (prev.includes(market)) {
          // Enforce min 1 market
          if (prev.length <= 1) return prev;
          return prev.filter((m) => m !== market);
        } else {
          // Gated logic: adding a second market requires auth
          if (!user && prev.length >= 1) {
            openModal("signin");
            return prev;
          }
          return [...prev, market];
        }
      });
    }
  };

  const setFrequency = (freq: any) => {
    if (presetLocked) return;
    setFrequencyState(freq);
  };

  const setScope = (scopeVal: any) => {
    if (presetLocked) return;
    setScopeState(scopeVal);
  };

  // Set target picks: clamp between 1 and 8
  const setTargetPicks = (picks: number) => {
    const clamped = Math.max(1, Math.min(8, picks));
    setTargetPicksState(clamped);
  };

  // H2H setters
  const setH2hEnabled = (enabled: boolean) => {
    setH2hEnabledState(enabled);
  };

  const setH2hThreshold = (threshold: "2_of_last_3" | "3_of_last_5" | "4_of_last_5") => {
    setH2hThresholdState(threshold);
  };

  // Load a preset: overrides strategy state and locks UI
  const loadPreset = (presetName: string) => {
    const preset = PRESETS[presetName];
    if (!preset) return;

    setCompetitionError(null);
    setActivePreset(presetName);
    setPresetLocked(true);

    setMarketModeState(preset.marketMode);
    setMarkets(preset.markets);
    setFrequencyState(preset.frequency);
    setScopeState(preset.scope);
  };

  // Clear a preset: restores control
  const clearPreset = () => {
    setActivePreset(null);
    setPresetLocked(false);
  };

  // Apply a preset then immediately unlock for customization
  const applyPresetAndCustomize = (presetName: string) => {
    const preset = PRESETS[presetName];
    if (!preset) return;
    setCompetitionError(null);
    setMarketModeState(preset.marketMode);
    setMarkets(preset.markets);
    setFrequencyState(preset.frequency);
    setScopeState(preset.scope);
    setActivePreset(null);
    setPresetLocked(false);
  };

  // Load last filters from localStorage or fall back to Safe Acca
  const loadLastFilters = () => {
    try {
      const stored = localStorage.getItem("bslip_last_strategy");
      if (stored) {
        const parsed = JSON.parse(stored);
        setCompetitions(parsed.competitions || ["EPL"]);
        setMarketModeState(parsed.marketMode || "single");
        setMarkets(parsed.markets || ["Over 1.5"]);
        setFrequencyState(parsed.frequency || "4_of_last_5");
        setScopeState(parsed.scope || "both");
        setTargetPicksState(parsed.targetPicks ?? 4);
        setActivePreset(null);
        setPresetLocked(false);
        setCompetitionError(null);
        return;
      }
    } catch (e) {
      console.error("Failed to load last strategy", e);
    }
    // Fallback: Safe Acca preset (starts unlocked so user can edit)
    loadPreset("Safe Acca");
    setPresetLocked(false);
    setActivePreset(null);
  };

  // Generate slip — synchronous, local-only using mock data
  const generateSlip = () => {
    if (competitions.length === 0 || markets.length === 0) {
      setGenerationError("Select competitions and markets before generating.");
      return;
    }

    setGenerationError(null);
    setIsGenerating(true);

    // Small delay so the button shows a brief generating state
    setTimeout(() => {
      const filtered = filterFixtures({
        competitions,
        markets,
        frequency,
        scope,
        h2h: h2hEnabled ? { enabled: true, threshold: h2hThreshold } : undefined,
      });

      const finalMatches = filtered.slice(0, targetPicks);

      if (finalMatches.length === 0) {
        setGenerationError("No fixtures qualify with current filters.");
        setIsGenerating(false);
        return;
      }

      // Build slip structure
      const slipId = Math.random().toString(36).substring(2, 11);
      const hasBorderline = finalMatches.some((m) => m.confidenceLevel === "Borderline");
      const allStrong = finalMatches.every((m) => m.confidenceLevel === "Strong");
      const overallConfidence = allStrong
        ? "Strong"
        : hasBorderline
        ? "Borderline"
        : "Moderate";

      const slip = {
        id: slipId,
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

      setGeneratedSlip(slip);

      // Save strategy locally
      localStorage.setItem(
        "bslip_last_strategy",
        JSON.stringify({
          competitions,
          marketMode,
          markets,
          frequency,
          scope,
          targetPicks,
        })
      );

      setIsGenerating(false);
    }, 200);
  };

  const clearSlip = () => {
    setGeneratedSlip(null);
    setGenerationError(null);
  };

  return (
    <SlipBuilderContext.Provider
      value={{
        competitions,
        marketMode,
        markets,
        frequency,
        scope,
        targetPicks,
        h2hEnabled,
        h2hThreshold,
        activePreset,
        presetLocked,
        competitionError,

        generatedSlip,
        isGenerating,
        generationError,

        toggleCompetition,
        setMarketMode,
        toggleMarket,
        setFrequency,
        setScope,
        setTargetPicks,
        setH2hEnabled,
        setH2hThreshold,
        loadPreset,
        clearPreset,
        applyPresetAndCustomize,
        loadLastFilters,
        generateSlip,
        clearSlip,
      }}
    >
      {children}
    </SlipBuilderContext.Provider>
  );
}

export function useSlipBuilder() {
  const context = useContext(SlipBuilderContext);
  if (!context) {
    throw new Error("useSlipBuilder must be used within a SlipBuilderProvider");
  }
  return context;
}
