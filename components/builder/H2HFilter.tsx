"use client";

import React from "react";
import { useSlipBuilder } from "./SlipBuilderContext";
import { cn } from "@/lib/utils";
import { LuShield } from "react-icons/lu";

const H2H_THRESHOLDS = [
  { value: "2_of_last_3", label: "2 of last 3 (67%)" },
  { value: "3_of_last_5", label: "3 of last 5 (60%)" },
  { value: "4_of_last_5", label: "4 of last 5 (80%)" },
];

export default function H2HFilter() {
  const {
    h2hEnabled,
    h2hThreshold,
    setH2hEnabled,
    setH2hThreshold,
  } = useSlipBuilder();

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-primary/10 text-primary">
            <LuShield className="h-3.5 w-3.5" />
          </span>
          <h3 className="font-semibold text-sm font-sora">Head-to-Head Filter</h3>
          <span className="text-[9px] font-mono text-muted-foreground">OPTIONAL</span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={h2hEnabled}
          aria-label="Toggle Head-to-Head filter"
          onClick={() => setH2hEnabled(!h2hEnabled)}
          className={cn(
            "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
            h2hEnabled ? "bg-primary" : "bg-muted/80 dark:bg-muted/60"
          )}
        >
          <span
            className={cn(
              "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm ring-0 transition-transform duration-150",
              h2hEnabled ? "translate-x-4" : "translate-x-0"
            )}
          />
        </button>
      </div>

      {h2hEnabled && (
        <div className="animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="space-y-2.5">
            <label className="text-xs font-semibold text-muted-foreground block font-sora">
              H2H Threshold
            </label>
            <select
              value={h2hThreshold}
              onChange={(e) => setH2hThreshold(e.target.value as any)}
              className="w-full h-10 px-3 py-1.5 rounded-lg border border-border/30 bg-muted/60 dark:bg-muted/40 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary hover:border-border/60 transition-colors duration-150 cursor-pointer"
            >
              {H2H_THRESHOLDS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <p className="text-[10px] text-muted-foreground font-mono">
              Additional filter: fixture qualifies only if team form AND H2H history pass the threshold.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}