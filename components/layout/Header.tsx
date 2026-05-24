"use client";

import Link from "next/link";
import { LuHistory, LuMoon, LuCoins } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import { UserMenu } from "@/components/auth/UserMenu";

export default function Header() {
  const { user, isLoading, openModal } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/50 dark:bg-background/40 backdrop-blur-xl backdrop-saturate-150 border-b border-border/30 shadow-sm">
      <div className="flex h-16 items-center px-5 md:px-8 max-w-[1360px] mx-auto">
        {/* Left: Logo */}
        <div className="flex items-center gap-2 w-1/3">
          <Link href="/" className="font-bold text-xl tracking-tight font-sora text-foreground">
            bslip<span className="text-primary">.</span>
          </Link>
        </div>

        {/* Center: Empty */}
        <div className="hidden md:flex flex-1 justify-center" />

        {/* Right: Actions */}
        <div className="flex flex-1 items-center justify-end gap-2 md:gap-3 w-1/3">
          {isLoading ? (
            /* Skeleton while session resolves */
            <div className="h-8 w-20 bg-muted animate-pulse rounded-lg" />
          ) : user ? (
            <>
              {/* Credits Display */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/8 rounded-lg text-sm font-medium text-primary">
                <LuCoins className="h-4 w-4" />
                <span className="font-mono text-xs font-semibold">1,200</span>
              </div>

              {/* History Button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground"
                aria-label="View slip history"
              >
                <LuHistory className="h-5 w-5" />
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hidden md:inline-flex"
                aria-label="Toggle theme"
              >
                <LuMoon className="h-5 w-5" />
              </Button>

              {/* User Menu Dropdown */}
              <UserMenu />
            </>
          ) : (
            <>
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hidden md:inline-flex"
                aria-label="Toggle theme"
              >
                <LuMoon className="h-5 w-5" />
              </Button>

              {/* Sign In */}
              <Button
                onClick={() => openModal("signin")}
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white rounded-lg"
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
