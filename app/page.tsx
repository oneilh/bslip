"use client";

import React, { useState, useEffect } from "react";
import CompetitionPicker from "@/components/builder/CompetitionPicker";
import MarketSelector from "@/components/builder/MarketSelector";
import StrategyFilters from "@/components/builder/StrategyFilters";
import PresetLoader from "@/components/builder/PresetLoader";
import SlipPanel from "@/components/layout/SlipPanel";
import ViewSlipMobile from "@/components/layout/ViewSlipMobile";
import { useSlipBuilder } from "@/components/builder/SlipBuilderContext";
import { cn } from "@/lib/utils";
import { LuZap, LuLoader, LuTriangleAlert } from "react-icons/lu";

export default function Home() {
  const {
    competitions,
    markets,
    generatedSlip,
    isGenerating,
    generationError,
    generateSlip,
  } = useSlipBuilder();

  const [activeTab, setActiveTab] = useState<"configure" | "slip">("configure");

  // Automatically switch tab on mobile/tablet when a slip compiles successfully
  useEffect(() => {
    if (generatedSlip && !isGenerating) {
      setActiveTab("slip");
    }
  }, [generatedSlip, isGenerating]);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Mobile/Tablet Tab Switcher — pill style, no border */}
      <div className="lg:hidden flex rounded-xl p-1 bg-muted shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab("configure")}
          className={cn(
            "flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer select-none",
            activeTab === "configure"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Configure Strategy
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("slip")}
          className={cn(
            "flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer select-none flex items-center justify-center gap-1.5",
            activeTab === "slip"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Your Slip
          {generatedSlip && (
            <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-primary text-white font-mono">
              {generatedSlip.totalLegs}
            </span>
          )}
        </button>
      </div>

      {/* Main Responsive Layout — explicit sidebar width */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 lg:gap-8 items-start w-full">
        {/* Left Column: Configurator */}
        <div
          className={cn(
            "flex flex-col gap-6 w-full min-w-0",
            activeTab !== "configure" && "hidden lg:flex"
          )}
        >
          {/* Header */}
          <div className="pb-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground font-sora">
              Strategy Builder
            </h1>
            <p className="text-muted-foreground mt-1.5 text-xs md:text-sm leading-relaxed">
              Configure your rules and scan fixtures to build your accumulator slip.
            </p>
          </div>

          {/* Strategy Workspace Sections */}
          <div className="flex flex-col gap-6 w-full">
            {/* Quick Presets Section */}
            <section className="bg-card dark:bg-card border border-border/30 rounded-xl p-5 md:p-6 shadow-sm relative overflow-hidden group transition-all duration-300 hover:shadow-md hover:border-primary/40">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10">
                <PresetLoader />
              </div>
            </section>
            
            {/* Competition Picker Section */}
            <section className="bg-card dark:bg-card border border-border/30 rounded-xl p-5 md:p-6 shadow-sm relative overflow-hidden group transition-all duration-300 hover:shadow-md hover:border-primary/40">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10">
                <CompetitionPicker />
              </div>
            </section>
            
            {/* Market Selector Section */}
            <section className="bg-card dark:bg-card border border-border/30 rounded-xl p-5 md:p-6 shadow-sm relative overflow-hidden group transition-all duration-300 hover:shadow-md hover:border-primary/40">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10">
                <MarketSelector />
              </div>
            </section>
            
            {/* Strategy Filters Section */}
            <section className="bg-card dark:bg-card border border-border/30 rounded-xl p-5 md:p-6 shadow-sm relative overflow-hidden group transition-all duration-300 hover:shadow-md hover:border-primary/40">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10">
                <StrategyFilters />
              </div>
            </section>

            {/* Mobile/Tablet Bottom Generate Button */}
            <div className="lg:hidden p-4 bg-card/80 dark:bg-card/40 backdrop-blur-md border border-border/60 rounded-xl shadow-sm space-y-3">
              {generationError && (
                <div className="flex items-start gap-2.5 p-3 bg-red-500/10 border border-red-500/20 text-red-600 rounded-xl text-xs">
                  <LuTriangleAlert className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{generationError}</span>
                </div>
              )}
              <button
                type="button"
                disabled={competitions.length === 0 || markets.length === 0 || isGenerating}
                onClick={generateSlip}
                className="w-full h-11 font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl flex items-center justify-center gap-2 transition-[transform,background-color] duration-150 active:scale-[0.97] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none"
              >
                {isGenerating ? (
                  <>
                    <LuLoader className="h-4 w-4 animate-spin" />
                    Generating Slip...
                  </>
                ) : (
                  <>
                    <LuZap className="h-4 w-4" />
                    Generate Slip
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Your Slip Sidebar */}
        <div
          className={cn(
            "w-full sticky lg:top-24",
            activeTab !== "slip" && "hidden lg:block"
          )}
        >
          <SlipPanel />
        </div>
      </div>

      {/* Mobile/Tablet Floating Banner Redirect Trigger */}
      {activeTab === "configure" && (
        <ViewSlipMobile onClick={() => setActiveTab("slip")} />
      )}
    </div>
  );
}
