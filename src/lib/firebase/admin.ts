import { cert, getApps, initializeApp, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { env } from "@/lib/env";

function initializeFirebaseAdminIfNeeded() {
  if (getApps().length > 0) {
    return;
  }

  const serviceAccountJson = env.optional.firebaseServiceAccountJson;
  const storageBucket = env.optional.firebaseAdminStorageBucket;

  if (serviceAccountJson) {
    const serviceAccount = JSON.parse(serviceAccountJson) as {
      project_id: string;
      client_email: string;
      private_key: string;
    };

    initializeApp({
      credential: cert({
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key,
      }),
      ...(storageBucket ? { storageBucket } : {}),
    });

    return;
  }

  initializeApp({
    credential: applicationDefault(),
    ...(storageBucket ? { storageBucket } : {}),
  });
}

export function getAdminAuth() {
  initializeFirebaseAdminIfNeeded();
  return getAuth();
}

export function getAdminDb() {
  initializeFirebaseAdminIfNeeded();
  return getFirestore();
}
