// // pages/api/verify-user.js (or app/api/verify-user/route.js)
// import { Users } from "@/config/schema";
// import db from "@/config/db";
// import { eq } from "drizzle-orm";
// import { NextResponse } from "next/server";

import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// export async function POST(req) {
//     try {
//         const { user } = await req.json();
//         console.log("User received in API:", user); // Log incoming user data

//         // Ensure that email exists in the user object
//         if (!user?.primaryEmailAddress?.emailAddress) {
//             return NextResponse.json({ error: 'Email is required in user data.' }, { status: 400 });
//         }

//         // Check if user exists in the database
//         const userInfo = await db.select().from(Users)
//             .where(eq(Users.email, user.primaryEmailAddress.emailAddress));
//         console.log("User found in DB:", userInfo);

//         if (userInfo?.length === 0) {
//             // Save new user if not found in the database
//             const SaveResult = await db.insert(Users).values({
//                 name: user.fullName,
//                 email: user.primaryEmailAddress.emailAddress,
//                 imageUrl: user.imageUrl,
//                 credit: 3, // Default credit
//             }).returning({ Users });

//             console.log("New user saved:", SaveResult);
//             return NextResponse.json({ result: SaveResult[0].Users });
//         }

//         return NextResponse.json({ result: userInfo[0] });
//     } catch (e) {
//         console.error('Error in verifying or saving user:', e);
//         return NextResponse.json({ error: e.message }, { status: 500 });
//     }
// }

export async function POST(req) {
    const { user } = await req.json();
    try{
        const userInfo = await db.select().from(Users).where(eq(Users.email, user?.primaryEmailAddress.emailAddress));
        console.log("User found in DB:", userInfo);

        if(userInfo?.length==0){
            const SaveResult = await db.insert(Users).values({
                name:user?.fullName,
                email:user?.primaryEmailAddress.emailAddress,
                imageUrl:user?.imageUrl,
            }).returning({Users});
            console.log("New user saved:", SaveResult);
            return NextResponse.json({result:SaveResult[0].Users});
        }
        return NextResponse.json({result:userInfo[0]});
    }catch(e){
        
    return NextResponse.json({error:e}); 
    }



}