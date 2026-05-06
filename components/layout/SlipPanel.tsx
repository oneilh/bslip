import { LuInbox } from "react-icons/lu";

export default function SlipPanel() {
  return (
    <div className="flex flex-col h-full bg-card rounded-xl border shadow-sm overflow-hidden">
      <div className="p-4 border-b bg-muted/20">
        <h2 className="font-semibold text-lg">Your Slip</h2>
      </div>
      
      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4 text-muted-foreground">
        <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center">
           <LuInbox className="h-8 w-8 opacity-50" />
        </div>
        <div>
          <p className="font-medium text-foreground">Your slip is empty</p>
          <p className="text-sm mt-1 max-w-[200px] mx-auto">Add legs from the builder to start creating your strategy.</p>
        </div>
      </div>
    </div>
  );
}
