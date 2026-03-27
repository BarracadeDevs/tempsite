import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  return (
    <div className={cn(
      'group rounded-lg border border-white/[0.04] bg-white/[0.01] p-6 transition-all duration-500 hover:border-white/[0.08]',
      className,
    )}>
      <Icon className="h-5 w-5 text-emerald-600 mb-4" />
      <h3 className="text-[14px] font-medium text-neutral-200 mb-2">{title}</h3>
      <p className="text-[13px] text-neutral-600 leading-relaxed">{description}</p>
    </div>
  );
}
