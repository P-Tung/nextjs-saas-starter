import { getFirestore } from "firebase/firestore";
import { getFirebaseDb } from "./client";

export { getFirestore };

export function getDb() {
  return getFirebaseDb();
}