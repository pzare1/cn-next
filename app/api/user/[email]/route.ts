import { connectToDB } from "@lib/mongoDB";
import User from "@models/User";
import { NextRequest } from "@node_modules/next/server";

export const GET = async(req: NextRequest, {params} : {params: {email:string}}) => {
    const { email } = params
    try {
        connectToDB();
        const user = await User.findOne({email : email})
        if(!user){
            throw new Error("user did not found")
        }
        return new Response(JSON.stringify(user),{ status:200 })
    } catch (error:any) {
        throw new Error(error.message)
    }
}