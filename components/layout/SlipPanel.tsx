"use client";

import { LuInbox, LuZap } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { useProtectedAction } from "@/lib/hooks/useProtectedAction";

export default function SlipPanel() {
  // Placeholder: real generate logic will live here once the slip builder is built.
  // For now this demonstrates the protected action pattern — unauthenticated users
  // will see the AuthModal; authenticated users will proceed to generation.
  const handleGenerate = () => {
    // TODO: POST /api/slips/generate
    console.log("Generating slip…");
  };

  const protectedGenerate = useProtectedAction(handleGenerate);

  return (
    <div className="flex flex-col h-full bg-card rounded-xl border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
        <h2 className="font-semibold text-lg">Your Slip</h2>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4 text-muted-foreground">
        <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center">
          <LuInbox className="h-8 w-8 opacity-50" aria-hidden="true" />
        </div>
        <div>
          <p className="font-medium text-foreground">Your slip is empty</p>
          <p className="text-sm mt-1 max-w-[200px] mx-auto">
            Add legs from the builder to start creating your strategy.
          </p>
        </div>
      </div>

      {/* Footer — Generate CTA (protected) */}
      <div className="p-4 border-t bg-muted/10">
        <Button
          id="generate-slip-btn"
          onClick={protectedGenerate}
          className="w-full h-11 font-semibold bg-[#F97316] hover:bg-[#EA6C0A] text-white gap-2 transition-colors duration-150"
          aria-label="Generate slip — requires sign in"
        >
          <LuZap className="h-4 w-4" aria-hidden="true" />
          Generate Slip
        </Button>
        <p className="text-[11px] text-muted-foreground text-center mt-2">
          1 credit per generation · 2 free per week
        </p>
      </div>
    </div>
  );
}
