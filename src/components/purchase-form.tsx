'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { ArrowRight, Download, Check } from 'lucide-react';
import Link from 'next/link';

type Step = 'purchase' | 'complete';

export function PurchaseForm() {
  const { data: session, status } = useSession();
  const [step, setStep] = useState<Step>('purchase');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handlePurchase(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setStep('complete');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  if (status === 'loading') {
    return (
      <div className="max-w-md">
        <p className="text-[14px] text-neutral-600">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-md">
        <p className="text-[14px] text-neutral-500 mb-6">
          Sign in to download Barracade.
        </p>
        <Link
          href="/login?callbackUrl=/purchase"
          className="inline-flex items-center gap-2 border border-emerald-500/60 bg-emerald-500/5 px-5 py-2.5 text-[14px] font-medium text-emerald-400 hover:bg-emerald-500/15 hover:border-emerald-400 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)] transition-all duration-300"
        >
          Sign in <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }

  if (step === 'complete') {
    return (
      <div className="max-w-md">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-6 w-6 rounded-full bg-emerald-700/20 flex items-center justify-center">
            <Check className="h-3 w-3 text-emerald-600" />
          </div>
          <span className="text-[14px] text-neutral-300">Download ready</span>
        </div>
        <p className="text-[13px] text-neutral-600 mb-8">
          Check your email for download instructions and your license key.
        </p>
        <Link
          href="/download"
          className="inline-flex items-center gap-2 border border-emerald-500/60 bg-emerald-500/5 px-5 py-2.5 text-[14px] font-medium text-emerald-400 hover:bg-emerald-500/15 hover:border-emerald-400 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)] transition-all duration-300"
        >
          <Download className="h-4 w-4" />
          Download Barracade
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md">
      <div className="rounded-lg border border-white/[0.04] bg-white/[0.01] p-6 mb-6">
        <div className="flex items-baseline justify-between mb-6">
          <span className="text-[14px] text-neutral-300">Barracade</span>
          <span className="text-[13px] text-neutral-600">Lifetime license</span>
        </div>
        <div className="border-t border-white/[0.04] pt-4 mb-4">
          <div className="flex items-baseline justify-between">
            <span className="text-[13px] text-neutral-500">One-time payment</span>
            <span className="text-[20px] font-medium text-white">$69.99</span>
          </div>
        </div>
        <div className="text-[12px] text-neutral-600">
          Purchasing as <span className="text-neutral-400">{session.user.email}</span>
        </div>
      </div>

      <form onSubmit={handlePurchase} className="space-y-4">
        {error && (
          <p className="text-[12px] text-red-500/70">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full border border-emerald-500/60 bg-emerald-500/5 px-5 py-2.5 text-[14px] font-medium text-emerald-400 hover:bg-emerald-500/15 hover:border-emerald-400 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="text-[13px]">Processing...</span>
          ) : (
            <>
              Download <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </form>

      <p className="mt-4 text-[11px] text-neutral-700">
        Secure checkout via Stripe. Includes all future updates.
      </p>
    </div>
  );
}
