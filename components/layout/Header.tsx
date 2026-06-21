"use client";

import Link from "next/link";
import { LuHistory, LuMoon, LuCoins, LuZap } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import { UserMenu } from "@/components/auth/UserMenu";

export default function Header() {
  const { user, isLoading, openModal } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-2xl backdrop-saturate-150 border-b border-border/40">
      <div className="flex h-16 items-center px-5 md:px-8 max-w-[1360px] mx-auto">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-2 w-1/3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-b from-primary to-primary/80 text-primary-foreground shadow-md shadow-primary/20 group-hover:shadow-primary/30 group-hover:-translate-y-0.5 transition-all duration-300">
              <LuZap className="h-4 w-4 fill-current" />
            </div>
            <span className="font-bold text-xl tracking-tight font-sora text-foreground">
              bslip<span className="text-primary">.</span>
            </span>
          </Link>
        </div>

        {/* Center: Empty */}
        <div className="hidden md:flex flex-1 justify-center" />

        {/* Right: Actions */}
        <div className="flex flex-1 items-center justify-end gap-2 md:gap-3 w-1/3">
          {isLoading ? (
            <div className="h-9 w-24 bg-muted animate-pulse rounded-full" />
          ) : user ? (
            <>
              {/* Credits */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/60 border border-border/50 rounded-full text-sm font-medium text-foreground cursor-default transition-colors hover:bg-muted">
                <LuCoins className="h-4 w-4 text-primary" />
                <span className="font-jetbrains-mono text-xs font-bold">1,200</span>
              </div>

              {/* History */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                aria-label="View slip history"
              >
                <LuHistory className="h-5 w-5" />
              </Button>

              {/* Theme */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 hidden md:inline-flex transition-colors"
                aria-label="Toggle theme"
              >
                <LuMoon className="h-5 w-5" />
              </Button>

              {/* User Menu Dropdown */}
              <div className="pl-1 md:pl-2 ml-1 md:ml-2 border-l border-border/40">
                <UserMenu />
              </div>
            </>
          ) : (
            <>
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 hidden md:inline-flex transition-colors"
                aria-label="Toggle theme"
              >
                <LuMoon className="h-5 w-5" />
              </Button>

              {/* Sign In */}
              <Button
                onClick={() => openModal("signin")}
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold px-5 shadow-md shadow-primary/20 transition-transform active:scale-95"
              >
                Sign in
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
