import { Button } from "@/components/ui/button";

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
        <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-card rounded-xl border shadow-sm p-6 flex flex-col min-h-[300px]">
          <h2 className="font-semibold text-lg mb-4">Competitions & Markets</h2>
          <div className="flex-1 bg-muted/20 rounded-lg border border-dashed flex items-center justify-center text-muted-foreground">
            Configuration Area
          </div>
        </div>

        {/* Medium Card: Presets */}
        <div className="col-span-1 bg-card rounded-xl border shadow-sm p-6 flex flex-col min-h-[300px]">
          <h2 className="font-semibold text-lg mb-4">Quick Presets</h2>
          <div className="flex-1 bg-muted/20 rounded-lg border border-dashed flex items-center justify-center text-muted-foreground">
            Presets List
          </div>
        </div>

        {/* Wide Card: Match Counts / Suggestions */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-card rounded-xl border shadow-sm p-6 flex flex-col min-h-[200px]">
           <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Suggestions</h2>
              <Button variant="outline" size="sm">View All</Button>
           </div>
          <div className="flex-1 bg-muted/20 rounded-lg border border-dashed flex items-center justify-center text-muted-foreground">
            AI Suggestions or Match Insights
          </div>
        </div>

      </div>
    </div>
  );
}
