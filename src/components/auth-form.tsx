'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

interface AuthFormProps {
  mode: 'login' | 'signup';
  callbackUrl?: string;
}

export function AuthForm({ mode, callbackUrl = '/' }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const inputClass =
    'w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 text-[14px] text-white placeholder:text-neutral-700 focus:outline-none focus:border-white/[0.12] transition-colors';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (password !== confirmPassword) {
          setError('Passwords do not match.');
          setLoading(false);
          return;
        }

        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name: name || undefined }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Signup failed.');
        }
      }

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(
          mode === 'login'
            ? 'Invalid email or password.'
            : 'Account created but sign-in failed. Try signing in manually.',
        );
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  const otherMode = mode === 'login' ? 'signup' : 'login';
  const otherLabel = mode === 'login' ? 'Create one' : 'Sign in';
  const otherPrompt =
    mode === 'login' ? 'No account?' : 'Already have an account?';
  const otherHref =
    callbackUrl && callbackUrl !== '/'
      ? `/${otherMode}?callbackUrl=${encodeURIComponent(callbackUrl)}`
      : `/${otherMode}`;

  return (
    <div className="max-w-sm w-full px-6 text-center">
      <Image src="/no-backround-logo.png" alt="Barracade" width={180} height={40} className="mx-auto mb-8 invert" />
      <h1 className="text-2xl font-medium text-white tracking-tight mb-2">
        {mode === 'login' ? 'Sign in' : 'Create an account'}
      </h1>
      <p className="text-[13px] text-neutral-600 mb-8">
        {mode === 'login'
          ? 'Sign in to your Barracade account.'
          : 'Set up your account to download Barracade.'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {mode === 'signup' && (
          <div>
            <label className="block text-[12px] text-neutral-600 mb-1.5">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className={inputClass}
            />
          </div>
        )}

        <div>
          <label className="block text-[12px] text-neutral-600 mb-1.5">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-[12px] text-neutral-600 mb-1.5">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={mode === 'signup' ? 'At least 8 characters' : undefined}
            minLength={mode === 'signup' ? 8 : undefined}
            className={inputClass}
          />
        </div>

        {mode === 'signup' && (
          <div>
            <label className="block text-[12px] text-neutral-600 mb-1.5">
              Confirm password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClass}
            />
          </div>
        )}

        {error && <p className="text-[12px] text-red-500/70">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full border border-emerald-500/60 bg-emerald-500/5 px-5 py-2.5 text-[14px] font-medium text-emerald-400 hover:bg-emerald-500/15 hover:border-emerald-400 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? <><Loader2 className="h-4 w-4 animate-spin inline mr-2" />{mode === 'login' ? 'Signing in...' : 'Creating account...'}</>
            : mode === 'login'
              ? 'Sign in'
              : 'Create account'}
        </button>
      </form>

      <p className="mt-6 text-[12px] text-neutral-700 text-center">
        {otherPrompt}{' '}
        <Link
          href={otherHref}
          className="text-neutral-400 hover:text-white transition-colors"
        >
          {otherLabel}
        </Link>
      </p>
    </div>
  );
}
