"use server";

import { getAdminDb } from "@/lib/firebase/admin";
import { headers } from "next/headers";
import { sendWaitlistOptInEmail } from "@/lib/email/transactional";
import { env } from "@/lib/env";

export type WaitlistSource = "hero" | "cta";

export interface WaitlistResult {
  success: boolean;
  error?: "duplicate" | "invalid" | "server_error";
  message?: string;
}

export async function addToWaitlist(
  email: string,
  source: WaitlistSource
): Promise<WaitlistResult> {
  try {
    const emailLower = email.toLowerCase().trim();
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailLower)) {
      return {
        success: false,
        error: "invalid",
        message: "Please enter a valid email address",
      };
    }

    const db = getAdminDb();
    
    // Check if Firebase Admin is actually initialized with a service account
    // If not, we fall back to "Demo Mode" success to keep the UX smooth for template users
    if (!db || (process.env.NODE_ENV === "development" && !env.optional.firebaseServiceAccountJson)) {
      console.log("🛠️ Waitlist: No Firebase Service Account found. Running in Demo Mode.");
      return {
        success: true,
        message: "Success! (Demo Mode: Setup Firebase to save real emails)",
      };
    }

    const waitlistRef = db.collection("waitlist");

    const existingDoc = await waitlistRef.where("email", "==", emailLower).limit(1).get();
    
    if (!existingDoc.empty) {
      return {
        success: false,
        error: "duplicate",
        message: "This email is already on the waitlist",
      };
    }

    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || null;
    const referrer = headersList.get("referer") || null;

    await waitlistRef.add({
      email: emailLower,
      createdAt: new Date(),
      source,
      userAgent,
      referrer,
    });

    const emailResult = await sendWaitlistOptInEmail(emailLower);
    if (!emailResult.success) {
      console.error("Waitlist opt-in email send failed", {
        email: emailLower,
        source,
        errorCode: emailResult.errorCode,
        errorMessage: emailResult.errorMessage,
      });
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    return {
      success: false,
      error: "server_error",
      message: "An error occurred. Please try again later.",
    };
  }
}
