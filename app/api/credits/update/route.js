import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { db } from '@/config/db'; 
import { Users } from '@/config/schema';
import { eq, sql } from 'drizzle-orm';

export async function POST(req) {
  const { userId } = auth(); // Clerk user ID

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get Clerk user's email
    const clerkUser = await clerkClient.users.getUser(userId);
    const userEmail = clerkUser.emailAddresses?.[0]?.emailAddress;

    if (!userEmail) {
      return NextResponse.json({ error: 'Email not found' }, { status: 400 });
    }

    const body = await req.json();
    const { credits, price, title } = body;

    if (!credits || !price || !title) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Increment user's credits using email
    await db
      .update(Users)
      .set({
        credits: sql`${Users.credits} + ${credits}`,
      })
      .where(eq(Users.email, userEmail));

    return NextResponse.json({ message: 'Credits updated successfully' });
  } catch (error) {
    console.error('Error updating credits:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
