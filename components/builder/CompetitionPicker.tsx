"use client";

import React from "react";
import { useSlipBuilder } from "./SlipBuilderContext";
import { LuCheck, LuLock, LuCircleAlert } from "react-icons/lu";
import { PiSoccerBall } from "react-icons/pi";
import { cn } from "@/lib/utils";

interface League {
  code: string;
  name: string;
  country: string;
  active: boolean;
}

const LEAGUES: League[] = [
  { code: "EPL", name: "Premier League", country: "ENG", active: true },
  { code: "LaLiga", name: "La Liga", country: "ESP", active: true },
  { code: "SerieA", name: "Serie A", country: "ITA", active: true },
  { code: "Bundesliga", name: "Bundesliga", country: "GER", active: false },
  { code: "Ligue1", name: "Ligue 1", country: "FRA", active: false },
  { code: "UCL", name: "Champions League", country: "EUR", active: false },
  { code: "UEL", name: "Europa League", country: "EUR", active: false },
  { code: "Eredivisie", name: "Eredivisie", country: "NED", active: false },
];

export default function CompetitionPicker() {
  const { competitions, toggleCompetition, presetLocked, competitionError } =
    useSlipBuilder();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2.5 pb-0.5">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-primary/10 text-primary text-[11px] font-bold shrink-0">
          1
        </span>
        <h3 className="font-semibold text-base font-sora">Select Competitions</h3>
        <span className="text-[10px] text-muted-foreground ml-auto font-mono">
          Pick 1–3
        </span>
      </div>

      {/* Warning Message */}
      {competitionError && (
        <div className="flex items-center gap-2.5 p-3 bg-red-500/8 border border-red-500/20 text-red-600 rounded-xl text-xs transition-all duration-200 animate-in fade-in slide-in-from-top-1">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 shrink-0">
            <LuCircleAlert className="h-3.5 w-3.5" />
          </span>
          <span className="font-medium">{competitionError}</span>
        </div>
      )}

      {/* League Selection Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {LEAGUES.map((league) => {
          const isSelected = competitions.includes(league.code);
          const isDisabled = !league.active || presetLocked;

          return (
            <button
              key={league.code}
              type="button"
              disabled={isDisabled}
              onClick={() => toggleCompetition(league.code)}
              className={cn(
                "relative flex flex-col justify-between p-3.5 rounded-xl border text-left transition-all duration-200",
                "h-24 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                league.active
                  ? "cursor-pointer bg-muted/40 hover:bg-muted/60 active:scale-[0.97]"
                  : "bg-muted/10 border-border/30 opacity-50 cursor-not-allowed",
                isSelected && league.active
                  ? "ring-1 ring-primary/50 bg-primary/5 border-primary/30"
                  : "border-border/30"
              )}
            >
              {/* Top Row: League Code & Badge / Lock */}
              <div className="flex items-center justify-between w-full">
                <span className="font-mono text-xs font-semibold text-muted-foreground">
                  {league.code}
                </span>

                {league.active ? (
                  isSelected && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white ring-2 ring-primary/20">
                      <LuCheck className="h-3 w-3" />
                    </span>
                  )
                ) : (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-muted-foreground" title="Coming soon">
                    <LuLock className="h-3 w-3" />
                  </span>
                )}
              </div>

              {/* Bottom Row: Name & Country */}
              <div className="mt-auto space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <PiSoccerBall
                    className={cn(
                      "h-3.5 w-3.5 shrink-0",
                      isSelected ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                  <p className="font-semibold text-xs leading-none tracking-tight">
                    {league.name}
                  </p>
                </div>
                <p className="text-[10px] text-muted-foreground font-mono">
                  {league.country}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
