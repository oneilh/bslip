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
      <div className="flex items-center gap-2.5 pb-0.5">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-primary/10 text-primary text-[11px] font-bold shrink-0">
          2
        </span>
        <h3 className="font-semibold text-base font-sora">Choose Market Mode</h3>
        
        {/* Toggle Mode Button Group */}
        <div className="inline-flex rounded-lg p-0.5 bg-muted ml-auto">
          <button
            type="button"
            disabled={presetLocked}
            onClick={() => setMarketMode("single")}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-150",
              marketMode === "single"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground disabled:opacity-50"
            )}
          >
            Single
          </button>
          
          <button
            type="button"
            disabled={presetLocked}
            onClick={() => setMarketMode("builder")}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-150 flex items-center gap-1",
              marketMode === "builder"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground disabled:opacity-50"
            )}
          >
            {!user && <LuLock className="h-3 w-3" />}
            Bet Builder
          </button>
        </div>
      </div>

      {/* Mode explanation — left accent stripe */}
      <div className="flex items-start gap-2.5 p-3 bg-muted/50 border-l-2 border-primary/40 rounded-r-xl text-xs text-muted-foreground">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted shrink-0 mt-0.5">
          <LuInfo className="h-3 w-3" />
        </span>
        <div className="leading-relaxed">
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
                "flex flex-col p-3.5 rounded-xl border text-left transition-all duration-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary select-none",
                isDisabled ? "cursor-not-allowed opacity-70" : "cursor-pointer bg-card hover:bg-accent active:scale-[0.97]",
                isSelected
                  ? "ring-1 ring-primary/50 bg-primary/5 border-primary/30"
                  : "border-border/30"
              )}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-semibold text-xs font-sora">
                  {market.name}
                </span>
                {showsLock && (
                  <span className="text-[9px] flex items-center gap-0.5 px-1.5 py-0.5 bg-muted/60 text-muted-foreground rounded font-mono">
                    <LuLock className="h-2.5 w-2.5" />
                    Auth
                  </span>
                )}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1.5 leading-relaxed">
                {market.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
