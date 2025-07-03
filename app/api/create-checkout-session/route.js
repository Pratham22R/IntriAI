// app/api/create-checkout-session/route.js
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: '20 AI Credits',
            },
            unit_amount: 1000, // $10
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://intriai.vercel.app/success',
      cancel_url: 'https://intriai.vercel.app/dashboard/buy-credits',
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe Session Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
