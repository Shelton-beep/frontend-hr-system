// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      token: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    firstName: string;
    email: string;
    role: string;
    token: string;
  }
}
