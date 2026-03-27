import Link from 'next/link';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-40 pb-20">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12 xl:px-16 text-center">
          <p className="text-[11px] font-mono text-neutral-700 mb-4">404</p>
          <h1 className="text-2xl font-medium tracking-tight text-white">
            Page not found
          </h1>
          <p className="mt-4 text-[14px] text-neutral-500 max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link
              href="/"
              className="rounded-lg bg-emerald-700 px-5 py-2.5 text-[14px] font-medium text-white hover:bg-emerald-600 transition-colors"
            >
              Back to home
            </Link>
            <Link
              href="/docs"
              className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 text-[14px] font-medium text-neutral-300 hover:bg-white/[0.04] transition-colors"
            >
              Documentation
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
