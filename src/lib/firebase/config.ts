import { env } from "@/lib/env";

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

export function getFirebaseConfig(): FirebaseConfig | null {
  const config: FirebaseConfig = {
    apiKey: env.optional.firebaseApiKey || "",
    authDomain: env.optional.firebaseAuthDomain || "",
    projectId: env.optional.firebaseProjectId || "",
    storageBucket: env.optional.firebaseStorageBucket || "",
    messagingSenderId: env.optional.firebaseMessagingSenderId || "",
    appId: env.optional.firebaseAppId || "",
    measurementId: env.optional.firebaseMeasurementId,
  };

  if (!config.apiKey || !config.projectId) {
    return null;
  }

  return config;
}

export function isFirebaseConfigured(): boolean {
  const config = getFirebaseConfig();
  return config !== null && !!config.apiKey && !!config.projectId;
}