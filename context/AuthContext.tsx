"use client"
import { SessionProvider } from "@node_modules/next-auth/react";

export const AuthContext = ({children} : {children:React.ReactNode}) => {
    return <SessionProvider>{children}</SessionProvider>
}

export default AuthContext;