import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { plan } = body;
    const title = plan.toUpperCase(); // Normalize input


    const priceIdMap = {
      STARTER: process.env.STRIPE_STARTER_PRICE_ID,
      PROFESSIONAL: process.env.STRIPE_PROFESSIONAL_PRICE_ID,
      ENTERPRISE: process.env.STRIPE_ENTERPRISE_PRICE_ID,
    };

    const creditsMap = {
      STARTER: 20,
      PROFESSIONAL: 100,
      ENTERPRISE: 250,
    };

    const priceId = priceIdMap[title];
    const credits = creditsMap[title];

    if (!priceId || !credits) {
      return NextResponse.json({ error: 'Invalid plan title' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata: {
        credits: credits.toString(),
        title,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
