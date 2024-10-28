// authUtils.ts
import { auth, googleProvider } from "../firebaseConfig";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";

// Google Sign-In
export const signInWithGoogle = async (): Promise<UserCredential | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result;
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    return null;
  }
};

// Sign-Up with Email and Password
export const signUpWithEmailPassword = async (
  email: string,
  password: string
): Promise<UserCredential | null> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result;
  } catch (error) {
    console.error("Error during sign-up:", error);
    return null;
  }
};

// Sign-In with Email and Password
export const signInWithEmailPassword = async (
  email: string,
  password: string
): Promise<UserCredential | null> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  } catch (error) {
    console.error("Error during sign-in:", error);
    return null;
  }
};
