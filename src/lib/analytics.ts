import { logEvent as firebaseLogEvent } from "firebase/analytics";
import { getFirebaseAnalytics } from "@/lib/firebase/client";

type EventParams = Record<string, string | number | boolean | undefined>;

export function track(eventName: string, params?: EventParams): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const analytics = getFirebaseAnalytics();
    if (analytics) {
      firebaseLogEvent(analytics, eventName, params);
    }
  } catch (error) {
    console.warn("Analytics tracking failed:", error);
  }
}

export const analytics = {
  track,
  page: (path: string) => track("page_view", { page_path: path }),
  event: (name: string, params?: EventParams) => track(name, params),
};
