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
  primary: 'bg-emerald-700 text-white hover:bg-emerald-600 active:bg-emerald-800',
  secondary: 'bg-white/[0.03] text-neutral-400 border border-white/[0.06] hover:bg-white/[0.05] hover:text-neutral-300',
  ghost: 'text-neutral-500 hover:text-neutral-300',
};

const sizes = {
  sm: 'h-8 px-3.5 text-[13px]',
  md: 'h-10 px-5 text-[14px]',
  lg: 'h-12 px-8 text-[15px]',
};

export function Button({ children, href, variant = 'primary', size = 'md', className, onClick }: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 ease-out',
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
