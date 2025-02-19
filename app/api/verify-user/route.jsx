import { Users } from "@/config/schema";
import db from "@/config/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req){
    const {user}=await req.json();
    try{
        const userInfo = await db.select().from(Users)
        .where(eq(Users.email, user ? primaryEmailAddress.emailAddress : null))
        console.log("User",userInfo);
    }catch(e){

    }
    return NextResponse.json({result:user});
}