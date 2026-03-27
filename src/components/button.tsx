import Link from 'next/link';
import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

const variants = {
  primary: 'border border-emerald-500/60 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/15 hover:border-emerald-400 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)] active:bg-emerald-500/20',
  secondary: 'border border-emerald-500/20 bg-transparent text-neutral-400 hover:border-emerald-500/40 hover:text-emerald-300 hover:shadow-[0_0_8px_rgba(16,185,129,0.08)]',
  ghost: 'text-neutral-500 hover:text-neutral-300',
};

const sizes = {
  sm: 'h-8 px-3.5 text-[13px]',
  md: 'h-10 px-5 text-[14px]',
  lg: 'h-12 px-8 text-[15px]',
};

export function Button({ children, href, variant = 'primary', size = 'md', className, onClick }: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 ease-out',
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:');
    if (isExternal) {
      return <a href={href} className={classes} rel="noopener noreferrer">{children}</a>;
    }
    return <Link href={href} className={classes}>{children}</Link>;
  }

  return <button onClick={onClick} className={classes}>{children}</button>;
}
