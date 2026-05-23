"use client";

import React from "react";
import { useSlipBuilder, PRESETS } from "./SlipBuilderContext";
import { cn } from "@/lib/utils";
import { LuHistory, LuLockOpen, LuLock, LuZap, LuSparkles, LuShuffle } from "react-icons/lu";

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

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-base font-sora">Quick Presets</h3>
        <button
          type="button"
          onClick={loadLastFilters}
          className="text-xs text-[#F97316] hover:text-[#EA6C0A] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
        >
          <LuHistory className="h-3.5 w-3.5" />
          Load Last Filters
        </button>
      </div>

      {/* Preset Applied Banner */}
      {presetLocked && activePreset && (
        <div className="flex flex-col gap-2 p-3 bg-[#FFEDD5] border border-orange-200 rounded-xl text-xs transition-all duration-200 animate-in fade-in">
          <div className="flex items-center gap-2">
            <LuSparkles className="h-4 w-4 shrink-0 text-orange-700" />
            <span className="text-orange-800">
              <strong>{activePreset}</strong> applied — controls are locked.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                clearPreset();
                // Reload the preset values but unlock
                applyPresetAndCustomize(activePreset);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white hover:bg-orange-50 border border-orange-300 rounded-lg font-semibold text-orange-900 transition-colors shadow-sm cursor-pointer text-[11px]"
            >
              <LuShuffle className="h-3 w-3" />
              Customize Preset
            </button>
            <button
              type="button"
              onClick={clearPreset}
              className="flex items-center justify-center gap-1 px-3 py-1.5 bg-white hover:bg-orange-50 border border-orange-200 rounded-lg font-semibold text-orange-800 transition-colors shadow-sm cursor-pointer text-[11px]"
            >
              <LuLockOpen className="h-3 w-3" />
              Clear & Edit
            </button>
          </div>
        </div>
      )}

      {/* Presets List */}
      <div className="flex-1 flex flex-col gap-2.5 overflow-y-auto">
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
                !presetLocked && "cursor-pointer active:scale-[0.99]",
                isApplied
                  ? "border-[#F97316] bg-[#FFEDD5]/10 shadow-[0_0_0_1px_#F97316] dark:bg-accent/5 ring-1 ring-[#F97316]/40"
                  : presetLocked
                  ? "border-border/50 bg-muted/20 opacity-60 cursor-not-allowed"
                  : "border-border bg-card hover:bg-surface-hover hover:border-muted-foreground/30",
                !presetLocked && !isActive && "cursor-pointer"
              )}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-semibold text-xs font-sora flex items-center gap-1 group-hover:text-primary transition-colors">
                  <LuZap className={cn("h-3.5 w-3.5 shrink-0", isActive ? "text-[#F97316] fill-[#F97316]/20" : "text-muted-foreground")} />
                  {preset.name}
                </span>

                <span className={cn(
                  "text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded",
                  preset.marketMode === "builder"
                    ? "bg-[#FFEDD5] text-[#F97316]"
                    : "bg-secondary text-secondary-foreground"
                )}>
                  {preset.marketMode === "builder" ? "BET BUILDER" : "SINGLE"}
                </span>
              </div>

              {/* Description */}
              <p className="text-[10px] text-muted-foreground/80 mt-1.5 leading-relaxed">
                {PRESET_DESCRIPTIONS[preset.name]}
              </p>

              {/* Preset details chips */}
              <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                {preset.markets.map((m) => (
                  <span key={m} className={cn(
                    "text-[9px] font-mono px-1.5 py-0.5 rounded",
                    isActive
                      ? "bg-[#F97316]/10 text-[#F97316]"
                      : "bg-secondary/60 text-secondary-foreground"
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
    </div>
  );
}
