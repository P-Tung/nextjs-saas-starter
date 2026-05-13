"use client";

import { useEffect, useState } from "react";
import { initAnalytics, getFirebaseAnalytics } from "@/lib/firebase/client";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { usePathname } from "next/navigation";

interface AnalyticsEvent {
  name: string;
  params?: Record<string, string | number | boolean>;
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    async function init() {
      if (!isFirebaseConfigured()) {
        return;
      }

      const analytics = await initAnalytics();
      if (analytics) {
        setInitialized(true);
      }
    }

    init();
  }, []);

  useEffect(() => {
    if (!initialized) return;

    const analytics = getFirebaseAnalytics();
    if (!analytics) return;

    import("firebase/analytics").then(({ logEvent }) => {
      logEvent(analytics, "page_view", {
        page_path: pathname,
        page_title: document.title,
        page_location: window.location.href,
      });
    });
  }, [pathname, initialized]);

  return <>{children}</>;
}

export function logEvent(event: AnalyticsEvent["name"], params?: AnalyticsEvent["params"]) {
  if (!isFirebaseConfigured()) {
    return;
  }

  const analytics = getFirebaseAnalytics();
  if (!analytics) {
    return;
  }

  import("firebase/analytics").then(({ logEvent }) => {
    logEvent(analytics, event, params);
  });
}

export function setUserProperties(properties: Record<string, string | number | boolean>) {
  if (!isFirebaseConfigured()) {
    return;
  }

  const analytics = getFirebaseAnalytics();
  if (!analytics) {
    return;
  }

  import("firebase/analytics").then(({ setUserProperties }) => {
    setUserProperties(analytics, properties);
  });
}

export function setUserId(userId: string) {
  if (!isFirebaseConfigured()) {
    return;
  }

  const analytics = getFirebaseAnalytics();
  if (!analytics) {
    return;
  }

  import("firebase/analytics").then(({ setUserId }) => {
    setUserId(analytics, userId);
  });
}