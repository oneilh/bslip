"use client";

import Link from "next/link";
import { LuHistory, LuMoon, LuCoins } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import { UserMenu } from "@/components/auth/UserMenu";

export default function Header() {
  const { user, isLoading, openModal } = useAuth();

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
        <div className="hidden md:flex flex-1 justify-center" />

        {/* Right: Actions */}
        <div className="flex flex-1 items-center justify-end gap-2 md:gap-4 w-1/3">
          {isLoading ? (
            /* Skeleton while session resolves */
            <div className="h-8 w-20 bg-muted animate-pulse rounded-lg" />
          ) : user ? (
            <>
              {/* Credits Display — visible only when authenticated */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-lg text-sm font-medium">
                <LuCoins className="text-primary h-4 w-4" />
                <span>1,200</span>
              </div>

              {/* History Button */}
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
              >
                <LuHistory className="h-5 w-5" />
                <span className="sr-only">History</span>
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground hidden md:inline-flex"
              >
                <LuMoon className="h-5 w-5" />
                <span className="sr-only">Toggle theme</span>
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
                className="text-muted-foreground hover:text-foreground hidden md:inline-flex"
              >
                <LuMoon className="h-5 w-5" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              {/* Sign In */}
              <Button
                onClick={() => openModal("signin")}
                size="sm"
                className="bg-[#F97316] hover:bg-[#EA6C0A] text-white"
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
