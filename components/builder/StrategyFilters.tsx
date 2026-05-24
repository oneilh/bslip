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
      <div className="flex items-center gap-2.5">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-primary/10 text-primary text-[11px] font-bold shrink-0">
          3
        </span>
        <h3 className="font-semibold text-base font-sora">Set Strategy Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Frequency Preset Selection */}
        <div className="space-y-2.5">
          <label className="text-xs font-semibold text-muted-foreground block font-sora">
            Frequency Threshold
          </label>
          <select
            value={frequency}
            disabled={presetLocked}
            onChange={(e) => setFrequency(e.target.value)}
            className={cn(
              "w-full h-10 px-3 py-1.5 rounded-lg border border-border/30 bg-card text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary hover:border-border/60 transition-colors duration-150",
              presetLocked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
            )}
          >
            {FREQUENCIES.map((freq) => (
              <option key={freq.value} value={freq.value}>
                {freq.label}
              </option>
            ))}
          </select>
          <p className="text-[10px] text-muted-foreground font-mono">
            How often the team must meet the market condition in recent games.
          </p>
        </div>

        {/* Scope Selection */}
        <div className="space-y-2.5">
          <label className="text-xs font-semibold text-muted-foreground block font-sora">
            Form Venue Scope
          </label>
          <select
            value={scope}
            disabled={presetLocked}
            onChange={(e) => setScope(e.target.value)}
            className={cn(
              "w-full h-10 px-3 py-1.5 rounded-lg border border-border/30 bg-muted/60 dark:bg-muted/40 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary hover:border-border/60 transition-colors duration-150",
              presetLocked ? "opacity-60 cursor-not-allowed bg-muted/10" : "cursor-pointer"
            )}
          >
            {SCOPES.map((sc) => (
              <option key={sc.value} value={sc.value}>
                {sc.label}
              </option>
            ))}
          </select>
          <p className="text-[10px] text-muted-foreground font-mono">
            {scope === "both" && "Evaluates overall recent form (both home and away matches)."}
            {scope === "home" && "Evaluates Home team on home matches; Away team on away matches."}
            {scope === "away" && "Evaluates Home team on away matches; Away team on home matches."}
          </p>
        </div>
      </div>

      {/* Target Picks Selector */}
      <div className="w-full p-4 rounded-xl bg-muted/70 dark:bg-muted/50">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-muted-foreground block font-sora">
              Target Picks
            </label>
            <span className="text-xs font-mono font-semibold text-foreground/80">
              {targetPicks} {targetPicks === 1 ? "fixture" : "fixtures"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-muted-foreground font-mono">1</span>
            <input
              type="range"
              min={1}
              max={8}
              value={targetPicks}
              onChange={(e) => setTargetPicks(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-[10px] text-muted-foreground font-mono">8</span>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono">
            Target number of fixtures for the generated slip. Results capped at this value.
          </p>
        </div>
      </div>

      {/* H2H Filter */}
      <div className="pt-3 border-t border-border/30">
        <H2HFilter />
      </div>
    </div>
  );
}
