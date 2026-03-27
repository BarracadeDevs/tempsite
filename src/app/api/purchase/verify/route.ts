import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';
import { generateLicenseKey } from '@/lib/license';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
  }

  let body: { sessionId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { sessionId } = body;
  if (!sessionId || typeof sessionId !== 'string') {
    return NextResponse.json(
      { error: 'Session ID is required.' },
      { status: 400 },
    );
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json(
      { error: 'Payment verification unavailable.' },
      { status: 503 },
    );
  }

  const stripe = new Stripe(stripeKey, { apiVersion: '2026-02-25.clover' as any });

  let stripeSession;
  try {
    stripeSession = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return NextResponse.json({ error: 'Invalid session.' }, { status: 400 });
  }

  if (stripeSession.payment_status !== 'paid') {
    return NextResponse.json(
      { error: 'Payment not completed.' },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found.' }, { status: 404 });
  }

  if (user.purchased && user.licenseKey) {
    return NextResponse.json({
      licenseKey: user.licenseKey,
      alreadyActivated: true,
    });
  }

  const licenseKey = generateLicenseKey();

  await prisma.user.update({
    where: { id: user.id },
    data: {
      purchased: true,
      purchasedAt: new Date(),
      licenseKey,
    },
  });

  return NextResponse.json({ licenseKey, alreadyActivated: false });
}
