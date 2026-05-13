import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
  limit,
} from "firebase/firestore";
import { getDb } from "./firestore";

export interface UserProfile {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  providerId: string;
  createdAt: Date;
  updatedAt: Date;
  role?: string;
  [key: string]: unknown;
}

const USERS_COLLECTION = "users";

export async function createUserProfile(
  userId: string,
  data: {
    email: string;
    displayName?: string;
    photoURL?: string;
    providerId?: string;
  }
): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firestore not initialized");

  const userRef = doc(db, USERS_COLLECTION, userId);
  await setDoc(userRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const db = getDb();
  if (!db) throw new Error("Firestore not initialized");

  const userRef = doc(db, USERS_COLLECTION, userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    return null;
  }

  const data = userSnap.data();
  return {
    id: userSnap.id,
    ...data,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
  } as UserProfile;
}

export async function updateUserProfile(
  userId: string,
  data: Partial<Omit<UserProfile, "id" | "createdAt">>
): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firestore not initialized");

  const userRef = doc(db, USERS_COLLECTION, userId);
  await updateDoc(userRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteUserProfile(userId: string): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firestore not initialized");

  const userRef = doc(db, USERS_COLLECTION, userId);
  await deleteDoc(userRef);
}

export async function getUserByEmail(email: string): Promise<UserProfile | null> {
  const db = getDb();
  if (!db) throw new Error("Firestore not initialized");

  const usersRef = collection(db, USERS_COLLECTION);
  const q = query(usersRef, where("email", "==", email), limit(1));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  const docSnap = querySnapshot.docs[0];
  const data = docSnap.data();
  return {
    id: docSnap.id,
    ...data,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
  } as UserProfile;
}

export async function ensureUserProfile(
  userId: string,
  data: {
    email: string;
    displayName?: string;
    photoURL?: string;
    providerId?: string;
  }
): Promise<UserProfile> {
  const profile = await getUserProfile(userId);
  
  if (!profile) {
    await createUserProfile(userId, data);
    return {
      id: userId,
      email: data.email,
      displayName: data.displayName || null,
      photoURL: data.photoURL || null,
      providerId: data.providerId || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  return profile;
}