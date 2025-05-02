import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { userId } = auth();  // ✅ Get user ID from session

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { credits, price, title } = body;

    if (!credits || !price || !title) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // ✅ TODO: Update the user's credits in your DB here
    console.log(`User ${userId} purchased ${credits} credits for ${price}, plan: ${title}`);

    // Send success
    return NextResponse.json({ message: 'Credits updated successfully' });
  } catch (error) {
    console.error('Error updating credits:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
