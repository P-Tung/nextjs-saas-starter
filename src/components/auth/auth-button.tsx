"use client";

import { useAuth } from "@/contexts/auth-context";
import { signOut } from "@/lib/firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, LogOut, User } from "lucide-react";
import { useState } from "react";

export function AuthButton({ variant = "default" }: { variant?: "default" | "header" | "mobile" }) {
  const { user, loading, configured } = useAuth();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  if (!configured || loading) {
    return (
      <button className="brutal-button px-3 py-2 text-xs opacity-60" disabled>
        <Loader2 className="w-4 h-4 animate-spin" />
      </button>
    );
  }

  if (user) {
    const handleSignOut = async () => {
      setSigningOut(true);
      await signOut();
      router.push("/");
    };

    return (
      <button
        onClick={handleSignOut}
        disabled={signingOut}
        className="brutal-button px-4 py-2 text-xs"
        title="Sign out"
      >
        {signingOut ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <LogOut className="w-4 h-4" />
        )}
        <span className={variant === "mobile" ? "" : "hidden sm:inline"}>Sign Out</span>
      </button>
    );
  }

  return (
    <Link href="/signin" className="brutal-button brutal-button-primary px-4 py-2 text-xs">
      <User className="w-4 h-4" />
      <span className={variant === "mobile" ? "" : "hidden sm:inline"}>Sign In</span>
    </Link>
  );
}

export function SignInButton() {
  const { user, loading, configured } = useAuth();

  if (!configured || loading) {
    return <span className="loading loading-spinner loading-sm"></span>;
  }

  if (user) {
    return (
      <Link href="/dashboard" className="brutal-button brutal-button-primary px-5 py-3">
        Go to Dashboard
      </Link>
    );
  }

  return (
    <Link href="/signin" className="brutal-button brutal-button-primary px-5 py-3">
      Get Started
    </Link>
  );
}
