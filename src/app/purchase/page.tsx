import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { PurchaseForm } from '@/components/purchase-form';
import { ScrollReveal } from '@/components/scroll-reveal';
import { CipherText } from '@/components/cipher-text';
import { GlitchText } from '@/components/glitch-text';
import { Check } from 'lucide-react';
import { AmbientCanvas } from '@/components/ambient-canvas';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download - Barracade',
  description: 'Get Barracade for $69.99. One-time purchase. Lifetime license across Windows, macOS, and Linux.',
};

const included = [
  'Website scanner with unlimited URL scans',
  'RASP engine covering 9 attack vectors',
  'Policy-based defense engine',
  'Static code analysis across 8 languages',
  'Compliance reporting (CIS, PCI-DSS, HIPAA, SOC 2)',
  'Dependency scanning and SBOM generation',
  'Secrets vault with AES-256-GCM encryption',
  'Desktop app for Windows, macOS, and Linux',
  'Every future update included',
];

export default function PurchasePage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <ScrollReveal>
            <GlitchText
              as="h1"
              className="text-4xl font-medium tracking-tight text-white sm:text-5xl mb-4"
            >
              Download
            </GlitchText>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-[15px] text-neutral-500 mb-20 max-w-md leading-relaxed">
              One-time payment, lifetime license. You get the full desktop app
              and every update we ship after that.
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <ScrollReveal delay={0.15}>
              <PurchaseForm />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div>
                <h2 className="text-[15px] font-medium text-neutral-300 mb-8">What you get</h2>
                <ul className="space-y-4">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span className="text-[14px] text-neutral-500 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-12 pt-8 border-t border-white/[0.04]">
                  <p className="text-[13px] text-neutral-600 leading-relaxed mb-6">
                    License is tied to your email. Install on as many machines as you want.
                    No subscriptions, no recurring charges.
                  </p>
                  <div className="mt-4 opacity-0 hover:opacity-30 transition-opacity duration-[3000ms]">
                    <CipherText
                      encrypted="38636661356137630000"
                      decrypted="8CFA5A7C"
                      hint="The third fragment completes the sequence"
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* FAQ */}
          <ScrollReveal delay={0.25}>
            <div className="relative isolate mt-24 pt-16 border-t border-white/[0.04]">
              <AmbientCanvas variant="waveform" className="absolute inset-0 -z-10" opacity={0.35} />
              <h2 className="text-[15px] font-medium text-neutral-300 mb-10">Common questions</h2>
              <div className="grid sm:grid-cols-2 gap-x-16 gap-y-8">
                {[
                  {
                    q: 'Is this a subscription?',
                    a: 'No. You pay once and own it forever. No monthly fees, no renewals. Every future update is included.',
                  },
                  {
                    q: 'Which platforms does it run on?',
                    a: 'Windows 10+, macOS 12+, and most Linux distributions. One license covers all platforms.',
                  },
                  {
                    q: 'Can I install it on multiple machines?',
                    a: 'Yes. Your license is tied to your email, not a specific machine. Install it anywhere you work.',
                  },
                  {
                    q: 'Do I need the internet to use it?',
                    a: 'Internet is required for website scanning and license activation. Static analysis and RASP run completely offline.',
                  },
                  {
                    q: 'What is the refund policy?',
                    a: '30 days. If Barracade doesn\'t work as described or you\'re not happy with it, email us for a full refund.',
                  },
                  {
                    q: 'Do new versions cost extra?',
                    a: 'No. All future updates are included with your purchase. There will never be a paid upgrade.',
                  },
                ].map(({ q, a }) => (
                  <div key={q}>
                    <p className="text-[13px] font-medium text-neutral-300 mb-2">{q}</p>
                    <p className="text-[13px] text-neutral-600 leading-[1.75]">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
