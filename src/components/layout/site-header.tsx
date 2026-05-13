"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { AuthButton } from "@/components/auth/auth-button";
import { Container } from "@/components/layout/container";
import { marketingNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Loader2, User, Settings, LogOut, LayoutDashboard } from "lucide-react";
import { signOut } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SiteHeader() {
  const { user, loading, configured } = useAuth();
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = async () => {
    setShowUserMenu(false);
    await signOut();
    router.push("/");
  };

  const isAuthenticated = !loading && configured && !!user && user !== null;

  return (
    <header className="sticky top-0 z-50 border-b-4 border-base-content bg-base-100">
      <Container className="flex min-h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3 py-3">
          <div className="relative border-4 border-base-content bg-primary p-1 brutal-shadow">
            <Image
              src="/icon.png"
              alt={`${siteConfig.name} icon`}
              width={38}
              height={38}
              className="relative h-[38px] w-[38px] object-cover"
              priority
            />
          </div>
          <div>
            <div className="font-mono-label text-[10px] font-bold uppercase tracking-widest text-base-content/60 transition-colors group-hover:text-secondary">
              {siteConfig.name}
            </div>
            <div className="font-display text-xl font-black uppercase tracking-tight">
              Launch System
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-2" aria-label="Primary">
          {isAuthenticated ? (
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="flex min-h-11 min-w-11 items-center justify-center border-4 border-transparent hover:border-base-content hover:bg-primary"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                {user?.photoURL ? (
                  <div className="w-8 border-2 border-base-content">
                    <Image
                      alt={user.displayName || "User"}
                      src={user.photoURL}
                      width={32}
                      height={32}
                      unoptimized
                      className="h-8 w-8"
                    />
                  </div>
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center border-2 border-base-content bg-primary text-primary-content">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </button>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-[1] mt-3 w-52 border-4 border-base-content bg-base-100 p-2 shadow-[4px_4px_0_0_var(--brutal-ink)]"
              >
                <li className="menu-title px-3 py-2">
                  <span className="text-sm font-medium">
                    {user?.displayName || "User"}
                  </span>
                  <span className="text-xs text-base-content/60 block truncate">
                    {user?.email}
                  </span>
                </li>
                <li>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Profile
                  </Link>
                </li>
                <li className="border-t border-base-300 mt-2 pt-2">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-error"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : loading ? (
            <button className="brutal-button px-3 py-2 text-xs opacity-60" disabled>
              <Loader2 className="w-4 h-4 animate-spin" />
            </button>
          ) : (
            <>
              {marketingNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className={`hidden min-h-10 border-4 border-transparent px-3 font-display text-xs font-black uppercase tracking-tight md:inline-flex ${
                    item.variant === "primary"
                      ? "brutal-button brutal-button-primary"
                      : "hover:border-base-content hover:bg-primary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <AuthButton />
            </>
          )}
        </nav>
      </Container>
    </header>
  );
}
