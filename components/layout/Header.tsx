import Link from "next/link";
import { LuHistory, LuSun, LuMoon, LuUser, LuCoins } from "react-icons/lu";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-2 w-1/3">
          <Link href="/" className="font-bold text-xl tracking-tight">
            bslip
          </Link>
        </div>

        {/* Center: Empty (Navigation removed) */}
        <div className="hidden md:flex flex-1 justify-center">
        </div>

        {/* Right: Actions */}
        <div className="flex flex-1 items-center justify-end gap-2 md:gap-4 w-1/3">
          {/* Credits Display */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-lg text-sm font-medium">
            <LuCoins className="text-primary h-4 w-4" /> 
            <span>1,200</span>
          </div>
          
          {/* History Button */}
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <LuHistory className="h-5 w-5" />
            <span className="sr-only">History</span>
          </Button>
          
          {/* Theme Toggle (Hidden on Mobile) */}
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hidden md:inline-flex">
            <LuMoon className="h-5 w-5" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Account Menu */}
          <Button variant="outline" size="icon" className="rounded-full border-muted">
            <LuUser className="h-4 w-4" />
            <span className="sr-only">Account menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
