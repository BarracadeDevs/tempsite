import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export function Section({ children, id, className }: SectionProps) {
  return (
    <section id={id} className={cn('py-20 md:py-28', className)}>
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12 xl:px-16">{children}</div>
    </section>
  );
}
