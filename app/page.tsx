"use client";

import { BentoCard } from "@/components/layout/BentoCard";
import CompetitionPicker from "@/components/builder/CompetitionPicker";
import MarketSelector from "@/components/builder/MarketSelector";
import StrategyFilters from "@/components/builder/StrategyFilters";
import PresetLoader from "@/components/builder/PresetLoader";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-sora">Strategy Builder</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Configure your rules and scan fixtures to build your accumulator slip.
        </p>
      </div>

      {/* Discover / Selection Container */}
      <div className="bg-card/30 border rounded-2xl p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Large Card: Main Configuration */}
          <BentoCard
            title="Strategy Configurations"
            className="col-span-1 lg:col-span-2 min-h-[400px] p-1"
          >
            <div className="space-y-6">
              <CompetitionPicker />
              <div className="h-px bg-border/60 w-full" />
              <MarketSelector />
              <div className="h-px bg-border/60 w-full" />
              <StrategyFilters />
            </div>
          </BentoCard>

          {/* Medium Card: Presets */}
          <BentoCard title="Presets & Templates" className="col-span-1 min-h-[400px]">
            <PresetLoader />
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
