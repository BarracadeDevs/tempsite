'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { Download, Check, Copy, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function PurchaseSuccessPage() {
  return (
    <Suspense fallback={<div className="flex items-center gap-3"><Loader2 className="h-5 w-5 text-emerald-600 animate-spin" /><span className="text-[14px] text-neutral-400">Verifying...</span></div>}>
      <PurchaseSuccessContent />
    </Suspense>
  );
}

function PurchaseSuccessContent() {
  const searchParams = useSearchParams();
  const { update } = useSession();
  const [licenseKey, setLicenseKey] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [verifying, setVerifying] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      setError('No session ID found. If you completed checkout, check your email.');
      setVerifying(false);
      return;
    }

    fetch('/api/purchase/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Verification failed.');
        }
        return res.json();
      })
      .then(async (data) => {
        setLicenseKey(data.licenseKey);
        await update({ purchased: true, licenseKey: data.licenseKey });
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Something went wrong.');
      })
      .finally(() => {
        setVerifying(false);
      });
  }, [searchParams, update]);

  function copyLicense() {
    if (!licenseKey) return;
    navigator.clipboard.writeText(licenseKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen flex items-center">
        <div className="mx-auto max-w-6xl px-6 w-full pt-20 pb-20">
          <div className="max-w-md">
            {verifying ? (
              <div className="flex items-center gap-3">
                <Loader2 className="h-5 w-5 text-emerald-600 animate-spin" />
                <span className="text-[14px] text-neutral-400">Verifying...</span>
              </div>
            ) : error ? (
              <>
                <h1 className="text-2xl font-medium tracking-tight text-white mb-4">
                  Something went wrong
                </h1>
                <p className="text-[13px] text-neutral-500 mb-8 leading-relaxed">
                  {error}
                </p>
                <Link
                  href="/purchase"
                  className="inline-flex items-center gap-2 rounded-lg bg-white/[0.06] px-5 py-2.5 text-[14px] font-medium text-white hover:bg-white/[0.1] transition-colors"
                >
                  Try again
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-6 w-6 rounded-full bg-emerald-700/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-emerald-600" />
                  </div>
                  <span className="text-[14px] text-neutral-300">Download ready</span>
                </div>
                <h1 className="text-2xl font-medium tracking-tight text-white mb-4">
                  Thank you
                </h1>

                {licenseKey && (
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4 mb-6">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[11px] text-neutral-600 mb-1">License Key</p>
                        <p className="text-[14px] font-mono text-emerald-600 tracking-wide">
                          {licenseKey}
                        </p>
                      </div>
                      <button
                        onClick={copyLicense}
                        className="flex items-center gap-1 text-[11px] text-neutral-700 hover:text-neutral-400 transition-colors shrink-0"
                      >
                        {copied ? (
                          <Check className="h-3.5 w-3.5 text-emerald-700" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                        {copied ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                )}
                <p className="text-[13px] text-neutral-600 mb-8 leading-relaxed">
                  Your license key has also been sent to your email.
                  You can download Barracade now and enter this key on first launch.
                </p>
                <Link
                  href="/download"
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-[14px] font-medium text-white hover:bg-emerald-600 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download Barracade
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

