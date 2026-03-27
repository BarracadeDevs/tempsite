'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Button } from '@/components/button';
import { Copy, Check, ArrowRight, LogOut } from 'lucide-react';

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  function copyLicense() {
    const key = session?.user?.licenseKey;
    if (!key) return;
    navigator.clipboard.writeText(key).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (status === 'loading') {
    return (
      <>
        <Nav />
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-[14px] text-neutral-600">Loading...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!session) {
    router.replace('/login?callbackUrl=/account');
    return null;
  }

  const purchased = session.user?.purchased;
  const licenseKey = session.user?.licenseKey;

  return (
    <>
      <Nav />
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollReveal>
            <h1 className="text-2xl font-medium tracking-tight text-white mb-10">Account</h1>
          </ScrollReveal>

          {/* Account info */}
          <ScrollReveal delay={0.05}>
            <div className="border border-white/[0.06] rounded-xl p-6 mb-6 bg-white/[0.01]">
              <h2 className="text-[12px] font-medium text-neutral-500 uppercase tracking-wide mb-5">Profile</h2>
              <div className="space-y-4">
                {session.user?.name && (
                  <div className="grid sm:grid-cols-[120px,1fr] gap-2">
                    <span className="text-[13px] text-neutral-600">Name</span>
                    <span className="text-[13px] text-neutral-300">{session.user.name}</span>
                  </div>
                )}
                <div className="grid sm:grid-cols-[120px,1fr] gap-2">
                  <span className="text-[13px] text-neutral-600">Email</span>
                  <span className="text-[13px] text-neutral-300">{session.user?.email}</span>
                </div>
                <div className="grid sm:grid-cols-[120px,1fr] gap-2">
                  <span className="text-[13px] text-neutral-600">License</span>
                  <span className={`text-[13px] ${purchased ? 'text-emerald-600' : 'text-neutral-600'}`}>
                    {purchased ? 'Active' : 'None'}
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* License key */}
          {purchased && licenseKey ? (
            <ScrollReveal delay={0.1}>
              <div className="border border-white/[0.06] rounded-xl p-6 mb-6 bg-white/[0.01]">
                <h2 className="text-[12px] font-medium text-neutral-500 uppercase tracking-wide mb-5">License Key</h2>
                <div className="flex items-center gap-3">
                  <code className="flex-1 font-mono text-[13px] text-emerald-500 bg-emerald-950/20 rounded-lg px-4 py-3 select-all">
                    {licenseKey}
                  </code>
                  <button
                    onClick={copyLicense}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/[0.06] text-[12px] text-neutral-500 hover:text-neutral-300 hover:border-white/[0.10] transition-colors shrink-0"
                  >
                    {copied ? (
                      <><Check className="h-3.5 w-3.5 text-emerald-500" /> Copied</>
                    ) : (
                      <><Copy className="h-3.5 w-3.5" /> Copy</>
                    )}
                  </button>
                </div>
                <p className="mt-3 text-[12px] text-neutral-700">
                  Enter this key in the Barracade desktop app to activate your license.
                </p>
              </div>
            </ScrollReveal>
          ) : !purchased ? (
            <ScrollReveal delay={0.1}>
              <div className="border border-white/[0.06] rounded-xl p-6 mb-6 bg-white/[0.01]">
                <h2 className="text-[12px] font-medium text-neutral-500 uppercase tracking-wide mb-4">No license</h2>
                <p className="text-[13px] text-neutral-600 mb-5 leading-relaxed">
                  You don't have a Barracade license yet. Purchase once to get lifetime access
                  across all platforms.
                </p>
                <Button href="/purchase" size="md">
                  Get Barracade for $69.99 <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </ScrollReveal>
          ) : null}

          {/* Downloads */}
          {purchased && (
            <ScrollReveal delay={0.15}>
              <div className="border border-white/[0.06] rounded-xl p-6 mb-6 bg-white/[0.01]">
                <h2 className="text-[12px] font-medium text-neutral-500 uppercase tracking-wide mb-4">Downloads</h2>
                <p className="text-[13px] text-neutral-600 mb-5 leading-relaxed">
                  Download the Barracade desktop app for your platform.
                </p>
                <Button href="/download" size="md">
                  Go to downloads <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </ScrollReveal>
          )}

          {/* Sign out */}
          <ScrollReveal delay={0.2}>
            <div className="pt-4">
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-2 text-[13px] text-neutral-600 hover:text-neutral-400 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
