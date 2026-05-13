import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  User,
  AuthError,
  sendPasswordResetEmail,
  updateProfile,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
} from "firebase/auth";
import { getFirebaseAuth } from "./client";

const EMAIL_FOR_SIGN_IN_KEY = "emailForSignIn";

const googleProvider = new GoogleAuthProvider();

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

async function handleAuthError(error: AuthError): Promise<AuthResult> {
  let message = "An error occurred";

  switch (error.code) {
    case "auth/popup-closed-by-user":
      message = "Sign-in was cancelled";
      break;
    case "auth/account-exists-with-different-credential":
      message = "An account already exists with a different sign-in method";
      break;
    case "auth/email-already-in-use":
      message = "This email is already registered";
      break;
    case "auth/invalid-email":
      message = "Invalid email address";
      break;
    case "auth/operation-not-allowed":
      message = "Operation not allowed";
      break;
    case "auth/weak-password":
      message = "Password is too weak";
      break;
    case "auth/user-disabled":
      message = "This account has been disabled";
      break;
    case "auth/user-not-found":
    case "auth/wrong-password":
      message = "Invalid email or password";
      break;
    case "auth/invalid-credential":
      message = "Invalid credentials";
      break;
    case "auth/too-many-requests":
      message = "Too many attempts. Please try again later";
      break;
    case "auth/network-request-failed":
      message = "Network error. Please check your connection";
      break;
    default:
      message = error.message;
  }

  return { success: false, error: message };
}

export async function signInWithGoogle(): Promise<AuthResult> {
  const auth = getFirebaseAuth();
  if (!auth) {
    return { success: false, error: "Auth not initialized" };
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { success: true, user: result.user };
  } catch (error) {
    if (error instanceof Error) {
      return handleAuthError(error as AuthError);
    }
    return { success: false, error: "Unknown error" };
  }
}

export async function signInWithEmail(email: string, password: string): Promise<AuthResult> {
  const auth = getFirebaseAuth();
  if (!auth) {
    return { success: false, error: "Auth not initialized" };
  }

  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: result.user };
  } catch (error) {
    if (error instanceof Error) {
      return handleAuthError(error as AuthError);
    }
    return { success: false, error: "Unknown error" };
  }
}

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName?: string
): Promise<AuthResult> {
  const auth = getFirebaseAuth();
  if (!auth) {
    return { success: false, error: "Auth not initialized" };
  }

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    if (displayName && result.user) {
      await updateProfile(result.user, { displayName });
    }

    return { success: true, user: result.user };
  } catch (error) {
    if (error instanceof Error) {
      return handleAuthError(error as AuthError);
    }
    return { success: false, error: "Unknown error" };
  }
}

export async function signOut(): Promise<AuthResult> {
  const auth = getFirebaseAuth();
  if (!auth) {
    return { success: false, error: "Auth not initialized" };
  }

  try {
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return handleAuthError(error as AuthError);
    }
    return { success: false, error: "Unknown error" };
  }
}

export async function resetPassword(email: string): Promise<AuthResult> {
  const auth = getFirebaseAuth();
  if (!auth) {
    return { success: false, error: "Auth not initialized" };
  }

  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return handleAuthError(error as AuthError);
    }
    return { success: false, error: "Unknown error" };
  }
}

export async function sendEmailLink(email: string, continueUrl?: string): Promise<AuthResult> {
  const auth = getFirebaseAuth();
  if (!auth) {
    return { success: false, error: "Auth not initialized" };
  }

  try {
    await sendSignInLinkToEmail(auth, email, {
      url: continueUrl || `${window.location.origin}/signin?email=${encodeURIComponent(email)}`,
      handleCodeInApp: true,
    });
    if (typeof window !== "undefined") {
      window.localStorage.setItem(EMAIL_FOR_SIGN_IN_KEY, email);
    }
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return handleAuthError(error as AuthError);
    }
    return { success: false, error: "Unknown error" };
  }
}

export async function completeSignInWithEmailLink(email?: string): Promise<AuthResult> {
  const auth = getFirebaseAuth();
  if (!auth) {
    return { success: false, error: "Auth not initialized" };
  }

  if (typeof window === "undefined") {
    return { success: false, error: "Not available on server" };
  }

  if (!isSignInWithEmailLink(auth, window.location.href)) {
    return { success: false, error: "Invalid sign-in link" };
  }

  const resolvedEmail =
    email?.trim() || window.localStorage.getItem(EMAIL_FOR_SIGN_IN_KEY) || "";

  if (!resolvedEmail) {
    return {
      success: false,
      error: "Please provide your email to complete sign-in",
    };
  }

  try {
    const result = await signInWithEmailLink(
      auth,
      resolvedEmail,
      window.location.href,
    );
    window.localStorage.removeItem(EMAIL_FOR_SIGN_IN_KEY);
    return { success: true, user: result.user };
  } catch (error) {
    if (error instanceof Error) {
      return handleAuthError(error as AuthError);
    }
    return { success: false, error: "Unknown error" };
  }
}

export function checkIsSignInLink(): boolean {
  if (typeof window === "undefined") return false;
  const auth = getFirebaseAuth();
  if (!auth) return false;
  return isSignInWithEmailLink(auth, window.location.href);
}

export async function deleteAccount(user: User): Promise<AuthResult> {
  try {
    await deleteUser(user);
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return handleAuthError(error as AuthError);
    }
    return { success: false, error: "Unknown error" };
  }
}

export async function reauthenticate(user: User, password: string): Promise<AuthResult> {
  try {
    const credential = EmailAuthProvider.credential(user.email || "", password);
    await reauthenticateWithCredential(user, credential);
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return handleAuthError(error as AuthError);
    }
    return { success: false, error: "Unknown error" };
  }
}