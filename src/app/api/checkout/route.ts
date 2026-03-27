import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Stripe from 'stripe';

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || !session?.user?.id) {
    return NextResponse.json(
      { error: 'You must be signed in to continue.' },
      { status: 401 },
    );
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    return NextResponse.json(
      { error: 'Payment processing is not configured yet. Please check back soon.' },
      { status: 503 }
    );
  }

  const stripe = new Stripe(stripeKey, { apiVersion: '2026-02-25.clover' });

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: session.user.email,
    metadata: {
      userId: session.user.id,
    },
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: { name: 'Barracade - Lifetime License' },
          unit_amount: 6999,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL || 'https://barracade.dev'}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL || 'https://barracade.dev'}/purchase`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
