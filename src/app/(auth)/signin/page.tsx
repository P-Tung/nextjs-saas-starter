"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import {
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  resetPassword,
  sendEmailLink,
  completeSignInWithEmailLink,
  checkIsSignInLink,
} from "@/lib/firebase/auth";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { handlePostSignupEmail } from "@/app/actions/auth";
import { Loader2, Mail, Lock } from "lucide-react";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showPasswordless, setShowPasswordless] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const [isProcessingLink, setIsProcessingLink] = useState(false);

  const triggerWelcomeEmailIfFirstSignup = useCallback(async (
    user: { uid: string; email: string | null; metadata?: { creationTime?: string | null; lastSignInTime?: string | null } },
  ) => {
    const creationTime = user.metadata?.creationTime || null;
    const lastSignInTime = user.metadata?.lastSignInTime || null;

    if (!user.email || !creationTime || !lastSignInTime) {
      return;
    }

    if (creationTime !== lastSignInTime) {
      return;
    }

    try {
      await handlePostSignupEmail({ userId: user.uid, email: user.email });
    } catch (emailError) {
      console.error("Post-signup welcome email action failed", emailError);
    }
  }, []);

  useEffect(() => {
    if (!isFirebaseConfigured() || !checkIsSignInLink()) {
      return;
    }
    setIsProcessingLink(true);
    completeSignInWithEmailLink().then((result) => {
      if (result.success) {
        if (result.user) {
          void triggerWelcomeEmailIfFirstSignup(result.user).finally(() => {
            setIsProcessingLink(false);
            router.push("/dashboard");
          });
          return;
        }
        setIsProcessingLink(false);
        router.push("/dashboard");
      } else {
        setError(result.error || "Failed to sign in with email link");
        setIsProcessingLink(false);
      }
    });
  }, [router, triggerWelcomeEmailIfFirstSignup]);

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/dashboard");
    }
  }, [authLoading, user, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user) {
    return null;
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = isSignUp
        ? await signUpWithEmail(email, password, displayName)
        : await signInWithEmail(email, password);

      if (result.success) {
        if (result.user) {
          await triggerWelcomeEmailIfFirstSignup(result.user);
        }
        router.push("/dashboard");
      } else {
        setError(result.error || "Authentication failed");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    const result = await signInWithGoogle();
    if (result.success) {
      if (result.user) {
        await triggerWelcomeEmailIfFirstSignup(result.user);
      }
      router.push("/dashboard");
    } else {
      setError(result.error || "Google sign-in failed");
      setLoading(false);
    }
  };

  const handlePasswordlessSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await sendEmailLink(email);
    if (result.success) {
      setLinkSent(true);
    } else {
      setError(result.error || "Failed to send sign-in link");
    }
    setLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await resetPassword(email);
    if (result.success) {
      setResetSent(true);
    } else {
      setError(result.error || "Failed to send reset email");
    }
    setLoading(false);
  };

  if (!isFirebaseConfigured()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-200 p-4">
        <div className="w-full max-w-md border-4 border-base-content bg-base-100 p-6 shadow-[4px_4px_0_0_var(--brutal-ink)]">
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-black uppercase">
              Firebase Not Configured
            </h2>
            <p className="text-base-content/70 mt-2">
              Please configure Firebase environment variables to enable authentication.
            </p>
            <div className="mt-4 border-4 border-base-content bg-primary p-4 text-sm">
              <p className="font-display font-black uppercase">Required environment variables:</p>
              <ul className="mt-2 list-inside list-disc space-y-1 font-mono-label text-xs uppercase text-base-content/80">
                <li>NEXT_PUBLIC_FIREBASE_API_KEY</li>
                <li>NEXT_PUBLIC_FIREBASE_PROJECT_ID</li>
                <li>NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN</li>
                <li>NEXT_PUBLIC_FIREBASE_APP_ID</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 p-4 technical-grid">
      <div className="w-full max-w-md border-4 border-base-content bg-base-100 p-6 shadow-[4px_4px_0_0_var(--brutal-ink)]">
        <div className="space-y-5">
          <h2 className="w-full text-center font-display text-2xl font-black uppercase">
            {showResetPassword
              ? "Reset Password"
              : isSignUp
              ? "Create Account"
              : "Welcome Back"}
          </h2>

          {error && (
            <div className="mt-4 flex gap-3 border-4 border-error bg-base-100 p-4 text-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {resetSent && (
            <div className="mt-4 flex gap-3 border-4 border-success bg-base-100 p-4 text-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Password reset email sent! Check your inbox.</span>
            </div>
          )}

          {linkSent && (
            <div className="mt-4 flex gap-3 border-4 border-success bg-base-100 p-4 text-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Sign-in link sent! Check your email to sign in.</span>
            </div>
          )}

          {isProcessingLink && (
            <div className="mt-4 flex gap-3 border-4 border-base-content bg-primary p-4">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing sign-in link...</span>
            </div>
          )}

          {!showResetPassword && (
            <>
              <div className="flex flex-col gap-3 mt-4">
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="brutal-button w-full justify-center px-5 py-3"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  )}
                  Continue with Google
                </button>
              </div>

              <div className="flex items-center gap-3 font-mono-label text-xs uppercase text-base-content/70">
                <div className="h-1 flex-1 bg-base-content" />
                OR
                <div className="h-1 flex-1 bg-base-content" />
              </div>

              <form onSubmit={showPasswordless ? handlePasswordlessSignIn : handleEmailAuth}>
                {isSignUp && (
                  <div className="form-control">
                    <label className="label px-0">
                      <span className="font-mono-label text-xs uppercase">Display Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="min-h-12 border-4 border-base-content bg-base-100 px-3 outline-none focus:bg-primary"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      required={isSignUp}
                    />
                  </div>
                )}

                <div className="form-control">
                  <label className="label px-0">
                    <span className="font-mono-label text-xs uppercase">Email</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-base-content/40" />
                    </div>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="min-h-12 w-full border-4 border-base-content bg-base-100 px-3 pl-10 outline-none focus:bg-primary"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {!showPasswordless && !isSignUp && (
                  <div className="form-control mt-4">
                    <label className="label px-0">
                      <span className="font-mono-label text-xs uppercase">Password</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-base-content/40" />
                      </div>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="min-h-12 w-full border-4 border-base-content bg-base-100 px-3 pl-10 outline-none focus:bg-primary"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                )}

                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="brutal-button brutal-button-primary w-full justify-center px-5 py-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : isSignUp ? (
                      "Create Account"
                    ) : showPasswordless ? (
                      "Send Sign-In Link"
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                {!isSignUp && !showPasswordless && (
                  <button
                    onClick={() => setShowResetPassword(true)}
                    className="font-mono-label text-xs uppercase hover:bg-primary"
                  >
                    Forgot password?
                  </button>
                )}
                {!isSignUp && !showPasswordless && (
                  <button
                    onClick={() => setShowPasswordless(true)}
                    className="ml-2 font-mono-label text-xs uppercase hover:bg-primary"
                  >
                    Sign in with email link
                  </button>
                )}
                {showPasswordless && (
                  <button
                    onClick={() => {
                      setShowPasswordless(false);
                      setLinkSent(false);
                    }}
                    className="font-mono-label text-xs uppercase hover:bg-primary"
                  >
                    Back to password sign in
                  </button>
                )}
                <p className="text-sm text-base-content/70">
                  {isSignUp ? "Already have an account?" : "Don\u2019t have an account?"}{" "}
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="font-mono-label text-xs uppercase hover:bg-primary"
                  >
                    {isSignUp ? "Sign In" : "Sign Up"}
                  </button>
                </p>
              </div>
            </>
          )}

          {showResetPassword && !resetSent && (
            <form onSubmit={handleResetPassword}>
              <div className="form-control">
                <label className="label px-0">
                  <span className="font-mono-label text-xs uppercase">Email</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-base-content/40" />
                  </div>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="min-h-12 w-full border-4 border-base-content bg-base-100 px-3 pl-10 outline-none focus:bg-primary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="brutal-button brutal-button-primary w-full justify-center px-5 py-3"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </div>

              <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    setShowResetPassword(false);
                    setResetSent(false);
                  }}
                  className="font-mono-label text-xs uppercase hover:bg-primary"
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link href="/" className="font-mono-label text-xs uppercase hover:bg-primary">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
}
