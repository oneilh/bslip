"use client";

import React from "react";
import { useSlipBuilder } from "@/components/builder/SlipBuilderContext";
import { LuZap, LuChevronRight } from "react-icons/lu";

interface ViewSlipMobileProps {
  onClick?: () => void;
}

export default function ViewSlipMobile({ onClick }: ViewSlipMobileProps) {
  const { generatedSlip } = useSlipBuilder();

  if (!generatedSlip) return null;

  return (
    <button
      onClick={onClick}
      className="lg:hidden fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-5 duration-300 text-left focus:outline-none cursor-pointer w-[calc(100%-32px)] pb-[env(safe-area-inset-bottom)]"
      aria-label={`View your generated slip with ${generatedSlip.totalLegs} legs`}
    >
      <div className="bg-primary text-white shadow-lg rounded-xl px-5 py-3.5 flex items-center justify-between font-semibold text-sm hover:bg-primary/90 active:scale-[0.98] transition-[transform,background-color] duration-150">
        <span className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
            <LuZap className="h-3.5 w-3.5" />
          </span>
          {generatedSlip.totalLegs} Legs Generated
        </span>
        <div className="flex items-center gap-2">
          <span className="opacity-80 text-xs">View Slip</span>
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
            <LuChevronRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </button>
  );
}
