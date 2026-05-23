"use client";

import React from "react";
import { useSlipBuilder } from "@/components/builder/SlipBuilderContext";

export default function ViewSlipMobile() {
  const { generatedSlip } = useSlipBuilder();

  if (!generatedSlip) return null;

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-5 duration-200">
      <div className="bg-[var(--ring-light)] border border-[var(--primary)] text-[var(--foreground)] shadow-lg rounded-xl px-5 py-3 flex items-center justify-between font-semibold text-sm">
        <span>{generatedSlip.totalLegs} Legs Generated</span>
        <div className="flex items-center gap-2">
          <span className="opacity-80">•</span>
          <span>View Slip</span>
        </div>
      </div>
    </div>
  );
}
