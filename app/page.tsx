import { BentoCard } from "@/components/layout/BentoCard";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Strategy Builder</h1>
        <p className="text-muted-foreground mt-1">
          Configure your settings and generate slips.
        </p>
      </div>

      {/* Discover / Selection Container */}
      <div className="bg-card/50 border rounded-2xl p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Large Card: Main Configuration */}
          <BentoCard
            title="Competitions & Markets"
            className="col-span-1 lg:col-span-2 min-h-[400px]"
          >
            <div className="h-full w-full bg-muted/20 rounded-lg border border-dashed flex items-center justify-center text-muted-foreground">
              Configuration Area
            </div>
          </BentoCard>

          {/* Medium Card: Presets */}
          <BentoCard title="Quick Presets" className="col-span-1 min-h-[400px]">
            <div className="h-full w-full bg-muted/20 rounded-lg border border-dashed flex items-center justify-center text-muted-foreground">
              Presets List
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
