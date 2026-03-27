'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#050505] font-sans antialiased flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-[11px] font-mono text-neutral-700 mb-4">500</p>
          <h1 className="text-2xl font-medium tracking-tight text-white">
            Something went wrong
          </h1>
          <p className="mt-4 text-[14px] text-neutral-500 max-w-md mx-auto leading-relaxed">
            An unexpected error occurred. If this keeps happening, contact{' '}
            <a
              href="mailto:security@barracade.com"
              className="text-neutral-400 hover:text-white transition-colors underline underline-offset-2"
            >
              security@barracade.com
            </a>.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <button
              onClick={reset}
              className="rounded-lg bg-emerald-700 px-5 py-2.5 text-[14px] font-medium text-white hover:bg-emerald-600 transition-colors"
            >
              Try again
            </button>
            <Link
              href="/"
              className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 text-[14px] font-medium text-neutral-300 hover:bg-white/[0.04] transition-colors"
            >
              Back to home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
