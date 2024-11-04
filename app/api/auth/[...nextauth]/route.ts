import NextAuth from "next-auth";
import { options } from "./option";

const handler = NextAuth(options);

export const GET = handler;
export const POST = handler;