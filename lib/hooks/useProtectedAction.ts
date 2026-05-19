"use client";

/**
 * useProtectedAction
 *
 * A hook that wraps any async action with an auth gate.
 *
 * If the user IS authenticated  → runs the action immediately.
 * If the user is NOT authenticated → opens the AuthModal instead.
 *
 * Usage:
 *   const protectedGenerate = useProtectedAction(handleGenerate);
 *   <button onClick={protectedGenerate}>Generate Slip</button>
 *
 * The hook accepts an optional `view` parameter ("signin" | "signup")
 * to control which tab the modal opens on. Defaults to "signin".
 *
 * Pattern: vercel-composition-patterns — avoid boolean prop proliferation;
 * compose auth gating via a hook rather than adding `requiresAuth` props
 * to every button.
 */

import { useCallback } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

type ProtectedCallback = (...args: any[]) => void | Promise<void>;

export function useProtectedAction(
  action: ProtectedCallback,
  view: "signin" | "signup" = "signin"
): ProtectedCallback {
  const { user, openModal } = useAuth();

  return useCallback(
    (...args: any[]) => {
      if (!user) {
        openModal(view);
        return;
      }
      return action(...args);
    },
    // action is intentionally excluded from deps to match the pattern:
    // rerender-dependencies — use primitive dependencies in effects.
    // The consumer should memoize `action` themselves if needed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, openModal, view]
  );
}
