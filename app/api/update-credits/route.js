// app/api/update-credits/route.js
import { NextResponse } from 'next/server';
import { db } from '@/config/db';
import { Users } from '@/config/schema';
import { eq } from 'drizzle-orm';

export async function POST(req) {
  try {
    const body = await req.json();
    const email = body.email;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Step 1: Get user
    const user = await db.select().from(Users).where(eq(Users.email, email));
    if (!user || user.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const currentCredits = user[0].credits || 0;
    const updatedCredits = currentCredits + 20;

    // Step 2: Update credits
    await db.update(Users)
      .set({ credits: updatedCredits })
      .where(eq(Users.email, email));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update Credits API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
