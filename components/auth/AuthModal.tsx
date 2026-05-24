"use client";

import React, { useState, useEffect } from "react";
import { LuMail, LuCircleCheck, LuLoader } from "react-icons/lu";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "./AuthProvider";
import { Button } from "@/components/ui/button";

export function AuthModal() {
  const { isModalOpen, closeModal, initialView } = useAuth();
  const [view, setView] = useState<"signin" | "signup">(initialView);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setView(initialView);
    setIsSubmitted(false);
    setErrorMsg("");
    setEmail("");
  }, [initialView, isModalOpen]);

  if (!isModalOpen) return null;

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setIsSubmitted(true);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setErrorMsg("");

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (error) {
        setErrorMsg(error.message);
        setIsGoogleLoading(false);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Could not connect to Google.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-200">
      <div className="absolute inset-0" onClick={closeModal} />

      <div
        className="relative w-full max-w-md overflow-hidden rounded-xl bg-background shadow-2xl p-6 md:p-8 z-10 animate-in zoom-in-95 duration-200 origin-center"
        style={{ animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold tracking-tight font-sora">
            {view === "signin" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1.5">
            {view === "signin"
              ? "Sign in to access your custom strategy filters and credits."
              : "Get started with 5 free credits upon authentication."}
          </p>
        </div>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-6 text-center animate-in fade-in-50">
            <div className="h-14 w-14 rounded-full bg-emerald-50 dark:bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
              <LuCircleCheck className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-semibold">Check your email</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-[280px]">
              We sent a magic link to <span className="font-medium text-foreground">{email}</span>. Click the link to complete authentication.
            </p>
            <Button
              variant="outline"
              className="mt-6 w-full"
              onClick={() => setIsSubmitted(false)}
            >
              Try another email
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 font-medium flex items-center justify-center gap-2.5 bg-background hover:bg-accent border-input"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading || isLoading}
            >
              {isGoogleLoading ? (
                <LuLoader className="h-5 w-5 animate-spin text-muted-foreground" />
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              <span>Continue with Google</span>
            </Button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-border/40" />
              <span className="flex-shrink mx-4 text-xs text-muted-foreground uppercase tracking-wider">
                Or continue with email
              </span>
              <div className="flex-grow border-t border-border/40" />
            </div>

            <form onSubmit={handleMagicLink} className="space-y-3">
              <div>
                <label htmlFor="auth-email" className="sr-only">Email address</label>
                <div className="relative">
                  <LuMail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="auth-email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 rounded-lg border border-input bg-background pl-9 pr-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent placeholder:text-muted-foreground transition-shadow duration-150"
                    disabled={isLoading || isGoogleLoading}
                    autoComplete="email"
                  />
                </div>
              </div>

              {errorMsg && (
                <p className="text-xs text-red-600 font-medium animate-in fade-in" role="alert">
                  {errorMsg}
                </p>
              )}

              <Button
                type="submit"
                className="w-full h-11 font-medium bg-primary hover:bg-primary/90 text-white transition-colors duration-150 rounded-lg"
                disabled={isLoading || isGoogleLoading}
              >
                {isLoading ? (
                  <LuLoader className="h-5 w-5 animate-spin" />
                ) : (
                  <span>Send Magic Link</span>
                )}
              </Button>
            </form>
          </div>
        )}

        <div className="mt-6 text-center text-sm border-t border-border/30 pt-4">
          <span className="text-muted-foreground">
            {view === "signin" ? "Don't have an account?" : "Already have an account?"}
          </span>{" "}
          <button
            type="button"
            className="font-semibold text-primary hover:underline focus:outline-none cursor-pointer"
            onClick={() => setView(view === "signin" ? "signup" : "signin")}
          >
            {view === "signin" ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
