import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkRateLimit } from '@/lib/rate-limit';

/**
 * License validation endpoint for the Barracade desktop app.
 * Desktop app calls POST /api/auth/validate-license with { licenseKey }
 * or { licenseKey, email } to verify a license is valid.
 */
export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';

  if (!checkRateLimit(`license:${ip}`)) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again in a minute.' },
      { status: 429 },
    );
  }

  let body: { licenseKey?: string; email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { licenseKey, email } = body;

  if (!licenseKey || typeof licenseKey !== 'string') {
    return NextResponse.json(
      { error: 'License key is required.' },
      { status: 400 },
    );
  }

  const user = await prisma.user.findFirst({
    where: {
      licenseKey,
      purchased: true,
      ...(email ? { email } : {}),
    },
  });

  if (!user) {
    return NextResponse.json(
      { valid: false, error: 'Invalid license key.' },
      { status: 404 },
    );
  }

  return NextResponse.json({
    valid: true,
    licenseKey: user.licenseKey,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    purchasedAt: user.purchasedAt,
  });
}
