"use client";

import CompetitionPicker from "@/components/builder/CompetitionPicker";
import MarketSelector from "@/components/builder/MarketSelector";
import StrategyFilters from "@/components/builder/StrategyFilters";
import PresetLoader from "@/components/builder/PresetLoader";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-sora">
          Strategy Builder
        </h1>
        <p className="text-muted-foreground mt-1.5 text-sm">
          Configure your rules and scan fixtures to build your accumulator slip.
        </p>
      </div>

      {/* Shared Workflow Area — Strategy Config + Presets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Strategy Configuration — larger share */}
        <section className="col-span-1 lg:col-span-2 bg-card border rounded-[10px] p-5 md:p-6 space-y-6">
          <CompetitionPicker />
          <div className="h-px bg-border/40 w-full" />
          <MarketSelector />
          <div className="h-px bg-border/40 w-full" />
          <StrategyFilters />
        </section>

        {/* Presets & Templates — smaller share, visually connected */}
        <section className="col-span-1 bg-card border rounded-[10px] p-5 md:p-6">
          <PresetLoader />
        </section>
      </div>
    </div>
  );
}
