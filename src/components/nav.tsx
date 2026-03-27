'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, LogOut } from 'lucide-react';

export function Nav() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/features', label: 'Features' },
    { href: '/docs', label: 'Docs' },
    ...(session?.user?.purchased
      ? [{ href: '/download', label: 'Download' }]
      : [{ href: '/purchase', label: 'Download' }]),
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-white/[0.04]' : 'bg-transparent border-b border-transparent'}`}>
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-6 lg:px-12 xl:px-16">
        <Link href="/" className="flex items-center">
          <Image src="/no-backround-logo.png" alt="Barracade" width={110} height={24} />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-semibold text-white hover:text-neutral-300 transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          {session ? (
            <>
              <Link
                href="/account"
                className="text-[13px] font-semibold text-neutral-400 hover:text-white transition-colors duration-300"
              >
                Account
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-1.5 text-[13px] font-semibold text-neutral-400 hover:text-white transition-colors duration-300"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-[13px] font-semibold text-white hover:text-neutral-300 transition-colors duration-300"
            >
              Sign in
            </Link>
          )}
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-neutral-500"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.04] bg-[#050505]/95 backdrop-blur-xl">
          <nav className="mx-auto max-w-[1600px] px-6 lg:px-12 xl:px-16 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[14px] text-neutral-500 hover:text-neutral-300 py-2 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {session ? (
              <>
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="text-[14px] text-neutral-500 hover:text-neutral-300 py-2 transition-colors"
                >
                  Account
                </Link>
                <button
                  onClick={() => { signOut({ callbackUrl: '/' }); setMobileOpen(false); }}
                  className="text-[14px] text-neutral-500 hover:text-neutral-300 py-2 text-left transition-colors"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="text-[14px] text-neutral-500 py-2 transition-colors"
              >
                Sign in
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
