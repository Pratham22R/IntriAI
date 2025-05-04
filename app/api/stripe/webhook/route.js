// app/api/stripe/webhook/route.js
import Stripe from 'stripe';
import { db } from '@/config/db';
import { Users } from '@/config/schema';
import { eq, sql } from 'drizzle-orm';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export async function POST(req) {
  const rawBody = await req.arrayBuffer();
  const sig = req.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const email = session?.customer_email;
    const metadata = session?.metadata;

    if (!email || !metadata) {
      return new Response('Missing data in webhook', { status: 400 });
    }

    const credits = parseInt(metadata.credits || '0');

    // Update DB credits
    await db
      .update(Users)
      .set({
        credits: sql`${Users.credits} + ${credits}`,
      })
      .where(eq(Users.email, email));

    console.log(`✅ Added ${credits} credits to ${email}`);
  }

  return new Response('Webhook received', { status: 200 });
}
