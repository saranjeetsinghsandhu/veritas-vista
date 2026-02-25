'use client';
import { Auth, signInWithEmailAndPassword, User } from "firebase/auth";

export const loginWithEmail = async (auth: Auth, email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};
