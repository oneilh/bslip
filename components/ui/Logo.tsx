import Link from "next/link";
import { LuZap } from "react-icons/lu";

interface LogoProps {
  className?: string;
  withText?: boolean;
}

export function Logo({ className, withText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 group ${className || ""}`}>
      <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary/15 text-primary group-hover:bg-primary/20 transition-all duration-300">
        <LuZap className="h-4 w-4 fill-current" />
      </div>
      {withText && (
        <span className="font-bold text-xl tracking-tight font-sora text-foreground">
          bslip<span className="text-primary">.</span>
        </span>
      )}
    </Link>
  );
}
