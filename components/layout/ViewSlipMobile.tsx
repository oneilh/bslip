import React from "react";

export default function ViewSlipMobile() {
  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
      <div className="bg-[var(--ring-light)] border border-[var(--primary)] text-[var(--foreground)] shadow-lg rounded-lg px-6 py-3 flex items-center justify-between font-medium">
        <span>3 Legs Added</span>
        <div className="flex items-center gap-2">
          <span className="opacity-80">•</span>
          <span>View Slip</span>
        </div>
      </div>
    </div>
  );
}
