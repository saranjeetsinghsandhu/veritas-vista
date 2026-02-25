'use client';
import { Auth, createUserWithEmailAndPassword, User } from "firebase/auth";

export const signupWithEmail = async (auth: Auth, email: string, password: string): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};
