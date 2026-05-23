"use client";

import React from "react";
import { useSlipBuilder } from "./SlipBuilderContext";
import { cn } from "@/lib/utils";
import { LuInfo, LuLock } from "react-icons/lu";
import { useAuth } from "@/components/auth/AuthProvider";

const AVAILABLE_MARKETS = [
  {
    id: "BTTS",
    name: "Both Teams to Score (BTTS)",
    description: "Both teams score at least 1 goal.",
  },
  {
    id: "Over 1.5",
    name: "Over 1.5 Goals",
    description: "Match has 2 or more total goals.",
  },
  {
    id: "Over 2.5",
    name: "Over 2.5 Goals",
    description: "Match has 3 or more total goals.",
  },
  {
    id: "Under 2.5",
    name: "Under 2.5 Goals",
    description: "Match has 2 or fewer total goals.",
  },
];

export default function MarketSelector() {
  const { user } = useAuth();
  const {
    marketMode,
    markets,
    setMarketMode,
    toggleMarket,
    presetLocked,
  } = useSlipBuilder();

  return (
    <div className="space-y-4">
      {/* Header and Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="font-semibold text-base font-sora">2. Choose Market Mode</h3>
        
        {/* Toggle Mode Button Group */}
        <div className="inline-flex rounded-lg p-0.5 bg-muted/60 border border-border/60">
          <button
            type="button"
            disabled={presetLocked}
            onClick={() => setMarketMode("single")}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-md transition-all",
              marketMode === "single"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground disabled:opacity-50"
            )}
          >
            Single Market
          </button>
          
          <button
            type="button"
            disabled={presetLocked}
            onClick={() => setMarketMode("builder")}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1",
              marketMode === "builder"
                ? "bg-[#F97316] text-white shadow-sm hover:bg-[#EA6C0A]"
                : "text-muted-foreground hover:text-foreground disabled:opacity-50"
            )}
          >
            {!user && <LuLock className="h-3 w-3" />}
            Bet Builder
          </button>
        </div>
      </div>

      {/* Mode explanation */}
      <div className="flex items-start gap-2 p-3 bg-secondary/40 border rounded-lg text-xs text-muted-foreground">
        <LuInfo className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
        <div>
          {marketMode === "single" ? (
            <p>
              <strong>Single Market Mode</strong>: A fixture is selected if it satisfies the single chosen market condition.
            </p>
          ) : (
            <p>
              <strong>Bet Builder Mode (AND logic)</strong>: Select multiple markets. A fixture is eligible ONLY if <strong>ALL</strong> chosen conditions evaluate to true for that fixture.
            </p>
          )}
        </div>
      </div>

      {/* Market Selector Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {AVAILABLE_MARKETS.map((market) => {
          const isSelected = markets.includes(market.id);
          const isDisabled = presetLocked;
          // Gating check for visual lock indicator
          const showsLock = marketMode === "builder" && !user && !isSelected && markets.length >= 1;

          return (
            <button
              key={market.id}
              type="button"
              disabled={isDisabled}
              onClick={() => toggleMarket(market.id)}
              className={cn(
                "flex flex-col p-3 rounded-xl border text-left transition-all duration-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary select-none",
                isDisabled ? "cursor-not-allowed opacity-75" : "cursor-pointer bg-card hover:bg-surface-hover hover:border-muted-foreground/30 active:scale-[0.99]",
                isSelected
                  ? "border-[#F97316] bg-[#FFEDD5]/10 shadow-[0_0_0_1px_#F97316] dark:bg-accent/5"
                  : "border-border"
              )}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-semibold text-xs font-sora">
                  {market.name}
                </span>
                {showsLock && (
                  <span className="text-[10px] flex items-center gap-0.5 px-1.5 py-0.5 bg-muted text-muted-foreground rounded font-mono">
                    <LuLock className="h-2.5 w-2.5" />
                    Auth
                  </span>
                )}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">
                {market.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
