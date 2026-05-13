"use server";

import { getAdminDb } from "@/lib/firebase/admin";
import { sendSignupWelcomeEmail } from "@/lib/email/transactional";

interface PostSignupEmailInput {
  userId: string;
  email: string;
}

interface PostSignupEmailResult {
  success: boolean;
  skipped: boolean;
}

export async function handlePostSignupEmail(
  input: PostSignupEmailInput,
): Promise<PostSignupEmailResult> {
  const userId = input.userId.trim();
  const email = input.email.trim().toLowerCase();

  if (!userId || !email) {
    return { success: false, skipped: true };
  }

  const db = getAdminDb();
  const userRef = db.collection("users").doc(userId);
  const userSnapshot = await userRef.get();

  const welcomeEmailSentAt = userSnapshot.get("emailLifecycle.welcomeEmailSentAt");
  if (welcomeEmailSentAt) {
    return { success: true, skipped: true };
  }

  const emailResult = await sendSignupWelcomeEmail(email);
  if (!emailResult.success) {
    console.error("Signup welcome email send failed", {
      userId,
      email,
      errorCode: emailResult.errorCode,
      errorMessage: emailResult.errorMessage,
    });

    return { success: false, skipped: false };
  }

  const nowIso = new Date().toISOString();
  await userRef.set(
    {
      email,
      emailLifecycle: {
        welcomeEmailSentAt: nowIso,
        updatedAt: nowIso,
      },
    },
    { merge: true },
  );

  return { success: true, skipped: false };
}
