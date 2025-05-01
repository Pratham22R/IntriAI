import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 1. Get the current authenticated user ID from Clerk
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // 2. Get credits info from request body
    const body = await req.json();
    const selectedOption = body.selectedOption;

    if (!selectedOption?.credits) {
      return NextResponse.json(
        { success: false, error: "Missing credits data" },
        { status: 400 }
      );
    }

    // 3. Get current user data (optional but useful to fetch current credits)
    const user = await db
      .select()
      .from(Users)
      .where(Users.id === userId)
      .limit(1);

    const currentCredits = user?.[0]?.credits || 0;

    // 4. Update credits
    const result = await db
      .update(Users)
      .set({
        credits: currentCredits + selectedOption.credits,
      })
      .where(Users.id === userId)
      .returning({ id: Users.id });

    // 5. Success/failure response
    if (result.length > 0) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false }, { status: 500 });
    }

  } catch (error) {
    console.error("Error updating credits:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
