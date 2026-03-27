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
              className="border border-emerald-500/60 bg-emerald-500/5 px-5 py-2.5 text-[14px] font-medium text-emerald-400 hover:bg-emerald-500/15 hover:border-emerald-400 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)] transition-all duration-300"
            >
              Back to home
            </Link>
            <Link
              href="/docs"
              className="border border-emerald-500/20 bg-transparent px-5 py-2.5 text-[14px] font-medium text-neutral-400 hover:border-emerald-500/40 hover:text-emerald-300 hover:shadow-[0_0_8px_rgba(16,185,129,0.08)] transition-all duration-300"
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
