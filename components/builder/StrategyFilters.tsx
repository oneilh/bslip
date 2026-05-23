"use client";

import React from "react";
import { useSlipBuilder } from "./SlipBuilderContext";
import H2HFilter from "./H2HFilter";
import { cn } from "@/lib/utils";

const FREQUENCIES = [
  { value: "3_of_last_5", label: "3 of last 5 games (60%)" },
  { value: "4_of_last_5", label: "4 of last 5 games (80%)" },
  { value: "4_of_last_6", label: "4 of last 6 games (67%)" },
  { value: "5_of_last_6", label: "5 of last 6 games (83%)" },
];

const SCOPES = [
  { value: "both", label: "Both Teams (Overall Form)" },
  { value: "home", label: "Home / Away Match Specific" },
  { value: "away", label: "Opposite Venue Specific" },
];

export default function StrategyFilters() {
  const {
    frequency,
    scope,
    targetPicks,
    setFrequency,
    setScope,
    setTargetPicks,
    presetLocked,
  } = useSlipBuilder();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-base font-sora">3. Set Strategy Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Frequency Preset Selection */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground block font-sora">
            Frequency Threshold
          </label>
          <div className="relative">
            <select
              value={frequency}
              disabled={presetLocked}
              onChange={(e) => setFrequency(e.target.value)}
              className={cn(
                "w-full h-10 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#F97316]",
                presetLocked ? "opacity-75 cursor-not-allowed bg-muted/20" : "cursor-pointer"
              )}
            >
              {FREQUENCIES.map((freq) => (
                <option key={freq.value} value={freq.value}>
                  {freq.label}
                </option>
              ))}
            </select>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono">
            How often the team must meet the market condition in recent games.
          </p>
        </div>

        {/* Scope Selection */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground block font-sora">
            Form Venue Scope
          </label>
          <div className="relative">
            <select
              value={scope}
              disabled={presetLocked}
              onChange={(e) => setScope(e.target.value)}
              className={cn(
                "w-full h-10 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#F97316]",
                presetLocked ? "opacity-75 cursor-not-allowed bg-muted/20" : "cursor-pointer"
              )}
            >
              {SCOPES.map((sc) => (
                <option key={sc.value} value={sc.value}>
                  {sc.label}
                </option>
              ))}
            </select>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono">
            {scope === "both" && "Evaluates overall recent form (both home and away matches)."}
            {scope === "home" && "Evaluates Home team on home matches; Away team on away matches."}
            {scope === "away" && "Evaluates Home team on away matches; Away team on home matches."}
          </p>
        </div>
      </div>

      {/* Target Picks Selector */}
      <div className="w-full">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-muted-foreground block font-sora">
              Target Picks
            </label>
            <span className="text-xs font-mono font-semibold text-foreground/80">
              {targetPicks} {targetPicks === 1 ? "fixture" : "fixtures"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground font-mono">1</span>
            <input
              type="range"
              min={1}
              max={8}
              value={targetPicks}
              onChange={(e) => setTargetPicks(Number(e.target.value))}
              className="flex-1 h-2 rounded-full appearance-none cursor-pointer bg-muted accent-[#F97316]"
            />
            <span className="text-xs text-muted-foreground font-mono">8</span>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono">
            Target number of fixtures for the generated slip. Results capped at this value.
          </p>
        </div>
      </div>

      {/* H2H Filter */}
      <div className="pt-2 border-t border-border/60">
        <H2HFilter />
      </div>
    </div>
  );
}
