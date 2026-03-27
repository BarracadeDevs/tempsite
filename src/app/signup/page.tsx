import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { AuthForm } from '@/components/auth-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account - Barracade',
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;
  return (
    <>
      <Nav />
      <main className="min-h-screen flex items-center pb-20">
        <div className="mx-auto max-w-6xl px-6 w-full pt-20">
          <AuthForm
            mode="signup"
            callbackUrl={callbackUrl || '/'}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
