import { Button } from "@/components/ui/button";
import { BentoCard } from "@/components/layout/BentoCard";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Strategy Builder</h1>
        <p className="text-muted-foreground mt-1">Configure your settings and generate slips.</p>
      </div>

      {/* Bento Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Large Card: Main Configuration */}
        <BentoCard 
          title="Competitions & Markets" 
          className="col-span-1 md:col-span-2 lg:col-span-2 min-h-[300px]"
        >
          <div className="h-full w-full bg-muted/20 rounded-lg border border-dashed flex items-center justify-center text-muted-foreground">
            Configuration Area
          </div>
        </BentoCard>

        {/* Medium Card: Presets */}
        <BentoCard 
          title="Quick Presets" 
          className="col-span-1 min-h-[300px]"
        >
          <div className="h-full w-full bg-muted/20 rounded-lg border border-dashed flex items-center justify-center text-muted-foreground">
            Presets List
          </div>
        </BentoCard>

        {/* Wide Card: Match Counts / Suggestions */}
        <BentoCard 
          title="Suggestions" 
          headerAction={<Button variant="outline" size="sm">View All</Button>}
          className="col-span-1 md:col-span-2 lg:col-span-3 min-h-[200px]"
        >
          <div className="h-full w-full bg-muted/20 rounded-lg border border-dashed flex items-center justify-center text-muted-foreground">
            AI Suggestions or Match Insights
          </div>
        </BentoCard>

      </div>
    </div>
  );
}
