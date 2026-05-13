import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAnalytics, Analytics, isSupported } from "firebase/analytics";
import { getFirebaseConfig, isFirebaseConfigured } from "./config";

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let analytics: Analytics | undefined;

export function initFirebaseClient() {
  if (!isFirebaseConfigured()) {
    console.warn("Firebase is not configured. Set Firebase environment variables.");
    return;
  }

  const config = getFirebaseConfig();
  if (!config) {
    console.warn("Firebase config is invalid.");
    return;
  }

  if (!app) {
    app = getApps().length === 0 ? initializeApp(config) : getApps()[0];
  }

  if (!auth) {
    auth = getAuth(app);
  }

  if (!db) {
    db = getFirestore(app);
  }

  return { app, auth, db };
}

export async function initAnalytics(): Promise<Analytics | null> {
  if (!isFirebaseConfigured()) {
    return null;
  }

  const config = getFirebaseConfig();
  if (!config?.measurementId) {
    return null;
  }

  const supported = await isSupported();
  if (supported && app && !analytics) {
    analytics = getAnalytics(app);
  }

  return analytics ?? null;
}

export function getFirebaseApp(): FirebaseApp | undefined {
  if (!app) {
    initFirebaseClient();
  }
  return app;
}

export function getFirebaseAuth(): Auth | undefined {
  if (!auth) {
    initFirebaseClient();
  }
  return auth;
}

export function getFirebaseDb(): Firestore | undefined {
  if (!db) {
    initFirebaseClient();
  }
  return db;
}

export function getFirebaseAnalytics(): Analytics | undefined {
  return analytics;
}