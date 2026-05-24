"use client";

import React, { useState } from "react";
import { useSlipBuilder, PRESETS } from "./SlipBuilderContext";
import { cn } from "@/lib/utils";
import { LuHistory, LuLockOpen, LuLock, LuZap, LuSparkles, LuShuffle, LuChevronDown } from "react-icons/lu";

const PRESET_DESCRIPTIONS: Record<string, string> = {
  "Safe Acca": "Low-risk — targets consistent Over 1.5 scorers. Best for stable accumulators.",
  "Goals Fest": "High-scoring specialists — finds teams hitting Over 2.5 reliably.",
  "Value Finder": "Finds matches where both teams consistently score. Strong value angle.",
  "Clean Sheet Hunt": "Defensive focus — targets low-scoring teams with Under 2.5 consistency.",
  "Bet Builder Starter": "Combines BTTS and Over 2.5 for aggressive multi-condition plays.",
};

export default function PresetLoader() {
  const {
    activePreset,
    presetLocked,
    loadPreset,
    clearPreset,
    applyPresetAndCustomize,
    loadLastFilters,
  } = useSlipBuilder();

  const presetList = Object.values(PRESETS);
  const [showPresets, setShowPresets] = useState(false);

  return (
    <div className="flex flex-col space-y-4">
      {/* Collapsible header — always visible */}
      <div className="flex items-center justify-between pb-1">
        <button
          type="button"
          onClick={() => setShowPresets(!showPresets)}
          className="font-semibold text-base font-sora flex items-center gap-2 cursor-pointer transition-colors duration-150 hover:text-primary"
          aria-expanded={showPresets}
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
            <LuZap className="h-3 w-3" />
          </span>
          Quick Presets
          <LuChevronDown
            className={cn(
              "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200",
              showPresets && "rotate-180"
            )}
          />
        </button>
        <button
          type="button"
          onClick={loadLastFilters}
          className="text-[11px] text-primary hover:bg-primary/5 font-semibold flex items-center gap-1 cursor-pointer transition-colors duration-150 px-2 py-1 rounded-md"
        >
          <LuHistory className="h-3.5 w-3.5" />
          Load Last
        </button>
      </div>

      {/* Preset Applied Banner */}
      {presetLocked && activePreset && (
        <div className="flex flex-col gap-2.5 p-3.5 bg-primary/5 border border-primary/15 rounded-xl text-xs transition-all duration-200 animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary shrink-0">
              <LuSparkles className="h-3.5 w-3.5" />
            </span>
            <span className="text-foreground text-[11px] leading-snug">
              <strong>{activePreset}</strong> applied — controls are locked. Customize or clear to make changes.
            </span>
          </div>
          <div className="flex items-center gap-2 pl-8">
            <button
              type="button"
              onClick={() => {
                clearPreset();
                // Reload the preset values but unlock
                applyPresetAndCustomize(activePreset);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-card hover:bg-accent border border-border/30 rounded-lg font-semibold text-foreground transition-colors duration-150 cursor-pointer text-[11px]"
            >
              <LuShuffle className="h-3 w-3" />
              Customize Preset
            </button>
            <button
              type="button"
              onClick={clearPreset}
              className="flex items-center justify-center gap-1 px-3 py-1.5 bg-card hover:bg-accent border border-border/30 rounded-lg font-semibold text-muted-foreground transition-colors duration-150 cursor-pointer text-[11px]"
            >
              <LuLockOpen className="h-3 w-3" />
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Presets List — collapsible */}
      {showPresets && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
        {presetList.map((preset) => {
          const isActive = activePreset === preset.name;
          const isApplied = presetLocked && isActive;

          return (
            <button
              key={preset.name}
              type="button"
              onClick={() => loadPreset(preset.name)}
              disabled={presetLocked && !isActive}
              className={cn(
                "w-full flex flex-col p-3 rounded-xl border text-left transition-all duration-200 group",
                !presetLocked && "cursor-pointer active:scale-[0.98] hover:translate-y-[-1px]",
                isApplied
                  ? "ring-1 ring-primary/40 bg-primary/5 border-primary/20"
                  : presetLocked
                  ? "border-border/20 bg-muted/10 opacity-50 cursor-not-allowed"
                  : "border-border/40 bg-muted/30 hover:bg-muted/50",
                !presetLocked && !isActive && "cursor-pointer"
              )}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-semibold text-xs font-sora flex items-center gap-1.5 group-hover:text-primary transition-colors duration-150">
                  <span className={cn(
                    "inline-flex h-5 w-5 items-center justify-center rounded-md transition-colors duration-150 shrink-0",
                    isActive ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                  )}>
                    <LuZap className={cn("h-3 w-3", isActive && "fill-primary/15")} />
                  </span>
                  {preset.name}
                </span>

                <span className={cn(
                  "text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded",
                  preset.marketMode === "builder"
                    ? "bg-primary/10 text-primary"
                    : "bg-secondary text-secondary-foreground"
                )}>
                  {preset.marketMode === "builder" ? "BET BUILDER" : "SINGLE"}
                </span>
              </div>

              {/* Description */}
              <p className="text-[10px] text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
                {PRESET_DESCRIPTIONS[preset.name]}
              </p>

              {/* Preset details chips */}
              <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                {preset.markets.map((m) => (
                  <span key={m} className={cn(
                    "text-[9px] font-mono px-1.5 py-0.5 rounded",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  )}>
                    {m}
                  </span>
                ))}
                <span className="text-[9px] text-muted-foreground font-mono">
                  {preset.frequency.replace(/_/g, " ")} · {preset.scope === "both" ? "Overall" : preset.scope}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      )}
    </div>
  );
}
