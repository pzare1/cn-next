import { connectToDB } from "@lib/mongoDB";
import User from "@models/User";
import { compare } from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "text"},
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            if(!credentials?.email || !credentials?.password){
               throw new Error("Email or Password did not entered")
            }
            await connectToDB();
            const user = await User.findOne({email : credentials?.email})
            if(!user){
                throw new Error("there is not any user");
            }else{
                const isMatchedPassword = await compare(credentials?.password, user?.password);
                if(!isMatchedPassword){
                    throw new Error("the password is not correct");
                }else{
                    return user;
                }
            }
          }
        })
      ],    
      secret: process.env.NEXTAUTH_SECRET
}