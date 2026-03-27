import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { ScrollReveal } from '@/components/scroll-reveal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Barracade',
  description: 'Terms governing your purchase and use of Barracade desktop security software.',
};

const EFFECTIVE_DATE = 'March 26, 2026';
const CONTACT_EMAIL = 'security@barracade.com';

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollReveal>
            <h1 className="text-2xl font-medium tracking-tight text-white">Terms of Service</h1>
            <p className="mt-2 text-[12px] font-mono text-neutral-700">Effective {EFFECTIVE_DATE}</p>
          </ScrollReveal>

          <div className="mt-12 space-y-12 text-[14px] text-neutral-500 leading-[1.8]">

            <ScrollReveal>
              <section>
                <p>
                  These terms govern your purchase and use of Barracade software
                  and barracade.dev. By purchasing or using Barracade, you agree to these terms.
                  If you do not agree, do not use the software.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section>
                <h2 className="text-[14px] font-medium text-neutral-300 mb-4">1. License grant</h2>
                <p className="mb-3">
                  Upon purchase, Barracade grants you a personal, non-exclusive,
                  non-transferable, perpetual license to install and use the Barracade
                  desktop application for your own security analysis purposes.
                </p>
                <p>
                  Your license is tied to your email address. You may install the software
                  on any number of machines you personally own or control.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section>
                <h2 className="text-[14px] font-medium text-neutral-300 mb-4">2. What you can do</h2>
                <ul className="space-y-2">
                  <li>Use Barracade on your own websites, applications, and infrastructure</li>
                  <li>Use Barracade to audit client projects as part of professional services</li>
                  <li>Install on multiple machines you personally control</li>
                  <li>Use all updates released after your purchase at no additional charge</li>
                </ul>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section>
                <h2 className="text-[14px] font-medium text-neutral-300 mb-4">3. What you cannot do</h2>
                <ul className="space-y-2">
                  <li>Resell, sublicense, or redistribute the software</li>
                  <li>Share your license key with others</li>
                  <li>Reverse engineer, decompile, or disassemble the software</li>
                  <li>Use the software to target systems you do not own or have explicit written authorization to test</li>
                  <li>Use the software for any illegal purpose</li>
                  <li>Remove or alter copyright notices or license information</li>
                </ul>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section>
                <h2 className="text-[14px] font-medium text-neutral-300 mb-4">4. Payment</h2>
                <p className="mb-3">
                  Barracade is sold for a one-time fee of $69.99 USD. This is a lifetime
                  license with no recurring charges, subscriptions, or renewal fees.
                </p>
                <p>
                  All payments are processed by Stripe. By completing a purchase, you also
                  agree to Stripe's terms of service. Prices may change for new purchases
                  but your existing license is not affected.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section>
                <h2 className="text-[14px] font-medium text-neutral-300 mb-4">5. Refund policy</h2>
                <p className="mb-3">
                  We offer a 30-day refund policy. If Barracade does not work as described
                  or you are not satisfied for any reason, contact us within 30 days of
                  purchase for a full refund. After 30 days, purchases are non-refundable.
                </p>
                <p>
                  To request a refund, email{' '}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-neutral-400 hover:text-white underline underline-offset-2 transition-colors"
                  >
                    {CONTACT_EMAIL}
                  </a>{' '}
                  with your order email address. Refunds are issued to your original payment method.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section>
                <h2 className="text-[14px] font-medium text-neutral-300 mb-4">6. Updates</h2>
                <p>
                  Your license includes all future updates to Barracade at no additional cost.
                  We may modify features, add functionality, or change system requirements in
                  updates. We do not guarantee that any specific feature will be maintained
                  in future versions.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section>
                <h2 className="text-[14px] font-medium text-neutral-300 mb-4">7. Disclaimer of warranties</h2>
                <p className="mb-3">
                  Barracade is provided "as is" without warranties of any kind, express or
                  implied. We do not warrant that the software will be error-free, that it
                  will detect every security vulnerability, or that it is suitable for any
                  particular purpose.
                </p>
                <p>
                  Security tools are aids to professional judgment, not replacements for it.
                  You are responsible for verifying findings and making decisions about your
                  own systems.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section>
                <h2 className="text-[14px] font-medium text-neutral-300 mb-4">8. Limitation of liability</h2>
                <p>
                  To the fullest extent permitted by law, Barracade's total liability for
                  any claim arising from these terms or your use of the software is limited
                  to the amount you paid for the software. We are not liable for indirect,
                  incidental, consequential, or punitive damages of any kind.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section>
                <h2 className="text-[14px] font-medium text-neutral-300 mb-4">9. Account termination</h2>
                <p>
                  We may suspend or terminate your account if you violate these terms,
                  engage in fraudulent activity, or use the software for unauthorized
                  security testing. In cases of termination for cause, no refund is owed.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section>
                <h2 className="text-[14px] font-medium text-neutral-300 mb-4">10. Governing law</h2>
                <p>
                  These terms are governed by the laws of the United States. Any disputes
                  arising from these terms or your use of Barracade will be resolved through
                  binding arbitration, except where prohibited by law.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section>
                <h2 className="text-[14px] font-medium text-neutral-300 mb-4">11. Changes to these terms</h2>
                <p>
                  We may update these terms. We will post the revised terms here with an
                  updated effective date. Continued use after changes take effect constitutes
                  acceptance. If changes are material, we will make reasonable efforts to
                  notify you by email.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section>
                <h2 className="text-[14px] font-medium text-neutral-300 mb-4">12. Contact</h2>
                <p>
                  Questions about these terms can be sent to{' '}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-neutral-400 hover:text-white underline underline-offset-2 transition-colors"
                  >
                    {CONTACT_EMAIL}
                  </a>.
                </p>
              </section>
            </ScrollReveal>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
