"use client";

import React from "react";
import { useSlipBuilder } from "@/components/builder/SlipBuilderContext";
import { Button } from "@/components/ui/button";
import {
  LuZap,
  LuLoader,
  LuTriangleAlert,
  LuX,
  LuSwords,
  LuGoal,
  LuTarget,
  LuShield,
} from "react-icons/lu";
import { cn } from "@/lib/utils";

const FREQ_LABELS: Record<string, string> = {
  "3_of_last_5": "3 of last 5 (60%)",
  "4_of_last_5": "4 of last 5 (80%)",
  "4_of_last_6": "4 of last 6 (67%)",
  "5_of_last_6": "5 of last 6 (83%)",
};

const SCOPE_LABELS: Record<string, string> = {
  home: "Home/Away Match Specific",
  away: "Opposite Venue Specific",
  both: "Both Teams (Overall Form)",
};

export default function SlipPanel() {
  const {
    competitions,
    marketMode,
    markets,
    frequency,
    scope,
    targetPicks,
    h2hEnabled,
    h2hThreshold,
    generatedSlip,
    isGenerating,
    generationError,
    generateSlip,
    clearSlip,
  } = useSlipBuilder();

  const hasConfig = competitions.length > 0 && markets.length > 0;

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-xl border overflow-hidden transition-all duration-200">
      {/* Header */}
      <div className="p-4 border-b border-border/40 flex items-center justify-between">
        <h2 className="font-semibold text-lg font-sora">Your Slip</h2>
        {generatedSlip && (
          <button
            type="button"
            onClick={clearSlip}
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 font-semibold cursor-pointer transition-colors"
            aria-label="Clear current slip and reset"
          >
            <LuX className="h-3.5 w-3.5" />
            Reset
          </button>
        )}
      </div>

      {/* Main Body — fixed height, no jumping */}
      <div className="flex-1 overflow-y-auto p-4">
        {generatedSlip ? (
          /* ========================
             STATE 2: Generated Slip
             ======================== */
          <div className="space-y-3.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
              <span>ID: {generatedSlip.id}</span>
              <span>Generated just now</span>
            </div>

            <div className="space-y-3">
              {generatedSlip.legs.map((leg: any) => (
                <div
                  key={leg.id}
                  className="p-3.5 rounded-xl border border-border bg-background hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-secondary text-secondary-foreground rounded shrink-0">
                      {leg.competition}
                    </span>
                    <span
                      className={cn(
                        "text-[9px] font-semibold px-2 py-0.5 rounded font-mono shrink-0 uppercase tracking-wider",
                        leg.confidenceLevel === "Strong" && "bg-green-500/10 text-green-600 border border-green-500/20",
                        leg.confidenceLevel === "Moderate" && "bg-orange-500/10 text-orange-600 border border-orange-500/20",
                        leg.confidenceLevel === "Borderline" && "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20"
                      )}
                    >
                      {leg.confidenceLevel}
                    </span>
                  </div>
                  <p className="font-semibold text-sm mt-2 text-foreground/95">
                    {leg.homeTeam} vs {leg.awayTeam}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                    {formatDate(leg.date)}
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-dashed border-border/80 space-y-1.5">
                    {leg.details.map((detail: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex flex-col gap-0.5 text-[10px] text-muted-foreground font-mono"
                      >
                        <div className="flex items-center justify-between text-foreground/90 font-semibold">
                          <span>Market:</span>
                          <span>{detail.market}</span>
                        </div>
                        <div className="flex items-center justify-between text-muted-foreground">
                          <span>Home stats:</span>
                          <span>{detail.homeStat}</span>
                        </div>
                        <div className="flex items-center justify-between text-muted-foreground">
                          <span>Away stats:</span>
                          <span>{detail.awayStat}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-secondary/30 rounded-xl border space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-muted-foreground">Total Selections:</span>
                <span className="font-bold font-mono">{generatedSlip.totalLegs} legs</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-muted-foreground">Overall Confidence:</span>
                <span
                  className={cn(
                    "font-bold font-mono uppercase text-[10px] px-2 py-0.5 rounded",
                    generatedSlip.overallConfidence === "Strong" && "bg-green-500/10 text-green-600",
                    generatedSlip.overallConfidence === "Moderate" && "bg-orange-500/10 text-orange-600",
                    generatedSlip.overallConfidence === "Borderline" && "bg-yellow-500/10 text-yellow-600"
                  )}
                >
                  {generatedSlip.overallConfidence}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* ========================
             STATE 1: Strategy Summary
             ======================== */
          <div className="h-full flex flex-col">
            <div className="flex-1 space-y-4">
              {/* Strategy parameters block */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider font-sora">
                  Strategy Summary
                </h3>

                <div className="space-y-2.5">
                  {/* Competitions */}
                  <div className="p-3 rounded-xl border border-border bg-background">
                    <div className="flex items-center gap-2 text-xs">
                      <LuSwords className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <span className="text-muted-foreground font-medium">Competitions</span>
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {competitions.length > 0 ? competitions.map((c) => (
                        <span key={c} className="text-[10px] font-mono font-semibold px-1.5 py-0.5 bg-secondary text-secondary-foreground rounded">
                          {c}
                        </span>
                      )) : (
                        <span className="text-[10px] text-muted-foreground italic">None selected</span>
                      )}
                    </div>
                  </div>

                  {/* Markets */}
                  <div className="p-3 rounded-xl border border-border bg-background">
                    <div className="flex items-center gap-2 text-xs">
                      <LuGoal className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <span className="text-muted-foreground font-medium">
                        {marketMode === "builder" ? "Bet Builder" : "Single Market"}
                      </span>
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {markets.map((m) => (
                        <span key={m} className="text-[10px] font-mono font-semibold px-1.5 py-0.5 bg-secondary text-secondary-foreground rounded">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Frequency + Scope */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 rounded-xl border border-border bg-background">
                      <span className="text-[10px] text-muted-foreground font-medium block">Frequency</span>
                      <span className="text-xs font-mono font-semibold mt-0.5 block">
                        {FREQ_LABELS[frequency] || frequency}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl border border-border bg-background">
                      <span className="text-[10px] text-muted-foreground font-medium block">Scope</span>
                      <span className="text-xs font-mono font-semibold mt-0.5 block">
                        {SCOPE_LABELS[scope] || scope}
                      </span>
                    </div>
                  </div>

                  {/* Target Picks */}
                  <div className="p-3 rounded-xl border border-border bg-background">
                    <div className="flex items-center gap-2 text-xs">
                      <LuTarget className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <span className="text-muted-foreground font-medium">Target Picks</span>
                    </div>
                    <span className="text-xs font-mono font-semibold mt-1 block">
                      {targetPicks} {targetPicks === 1 ? "fixture" : "fixtures"}
                    </span>
                  </div>

                  {/* H2H Summary */}
                  <div className="p-3 rounded-xl border border-border bg-background">
                    <div className="flex items-center gap-2 text-xs">
                      <LuShield className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <span className="text-muted-foreground font-medium">H2H Filter</span>
                    </div>
                    <span className="text-xs font-mono font-semibold mt-1 block">
                      {h2hEnabled
                        ? `Enabled (${h2hThreshold.replace(/_/g, " ")})`
                        : "Disabled"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer — Generate CTA */}
      <div className="p-4 border-t border-border/40">
        {generationError && (
          <div className="mb-3 flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-600 rounded-xl text-xs">
            <LuTriangleAlert className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{generationError}</span>
          </div>
        )}

        <Button
          id="generate-slip-btn"
          disabled={!hasConfig || isGenerating || !!generatedSlip}
          onClick={generateSlip}
          className="w-full h-11 font-semibold bg-[#F97316] hover:bg-[#EA6C0A] text-white gap-2 transition-colors duration-150 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          aria-label={
            generatedSlip
              ? "Accumulator generated"
              : "Generate accumulator slip based on your active filters"
          }
        >
          {isGenerating ? (
            <>
              <LuLoader className="h-4 w-4 animate-spin" />
              Generating Slip...
            </>
          ) : generatedSlip ? (
            <>
              <LuZap className="h-4 w-4" aria-hidden="true" />
              Generate New Slip
            </>
          ) : (
            <>
              <LuZap className="h-4 w-4" aria-hidden="true" />
              Generate Slip
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
