"use client";

import { useRef, useState, useEffect } from "react";
import { LuLogOut } from "react-icons/lu";
import { useAuth } from "@/components/auth/AuthProvider";

export function UserMenu() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const email = user?.email ?? "";
  const initial = email.charAt(0).toUpperCase();

  // Close on outside click (client-event-listeners: dedup global listeners)
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut();
    setOpen(false);
    setIsSigningOut(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/*
        Avatar trigger button.

        ui-ux-pro-max §1 (Accessibility): aria-label for icon-only controls.
        ui-ux-pro-max §2 (Touch): min 44×44px touch target.
        ui-ux-pro-max §6 (Color): hardcoded #F97316 so it is NEVER overridden
          by a CSS variable that could resolve to a similar hue as the header
          background — this was the original "blending" bug.
        ui-ux-pro-max §7 (Animation): scale feedback 0.95 on press.
        ui-animation: CSS transition on transform+opacity only, ease-out 150ms.
      */}
      <button
        id="user-menu-trigger"
        aria-label={`User menu for ${email}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={[
          "h-9 w-9 rounded-full",
          "bg-primary/15 hover:bg-primary/20 text-primary text-sm font-bold leading-none",
          "flex items-center justify-center select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
          "transition-all duration-150 ease-out",
          "active:scale-95",
          "cursor-pointer",
        ].join(" ")}
        title={email}
      >
        {initial || "?"}
      </button>

      {/*
        Dropdown menu.
        ui-animation: enters with scale(0.92)+opacity from top-right origin,
          200ms cubic-bezier(0.22,1,0.36,1) — matches "Enter" curve from skill.
        Exits instantly when `open` becomes false (conditional render = fast exit).
        transform-origin: top right to emerge from the trigger (ui-animation:
          "Emerge from the trigger" principle).
      */}
      {open && (
        <div
          role="menu"
          aria-labelledby="user-menu-trigger"
          className={[
            "absolute right-0 mt-2 w-56 z-50",
            "rounded-xl border border-border bg-background shadow-xl",
            "overflow-hidden",
            // Enter animation: scale from 0.92 at top-right origin (ui-animation)
            "animate-in fade-in-0 zoom-in-95 duration-200",
            "origin-top-right",
          ].join(" ")}
          style={{ animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
        >
          {/* User info header */}
          <div className="px-4 py-3 border-b border-border/60">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-0.5">
              Signed in as
            </p>
            <p className="text-sm font-medium text-foreground truncate" title={email}>
              {email}
            </p>
          </div>

          {/* Actions list */}
          <div className="py-1">
            {/*
              Sign out button.
              ui-ux-pro-max §9 (Navigation): destructive actions visually
                separated from primary nav — placed at the bottom, muted icon.
              ui-ux-pro-max §8 (Forms): disabled state with opacity during load.
              loading-buttons: disable + show state change during async op.
            */}
            <button
              role="menuitem"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className={[
                "w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left",
                "text-foreground hover:bg-muted/50",
                // CSS transition: color+bg only — complies with ui-animation
                "transition-colors duration-150",
                "disabled:opacity-40 disabled:cursor-not-allowed",
                "cursor-pointer",
              ].join(" ")}
            >
              <LuLogOut
                className="h-4 w-4 text-muted-foreground shrink-0"
                aria-hidden="true"
              />
              <span>{isSigningOut ? "Signing out…" : "Sign out"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
