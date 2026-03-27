'use client';

import { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/cn';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({ code, filename, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  return (
    <div className={cn('rounded-lg border border-white/[0.06] bg-[#0a0a0a] overflow-hidden', className)}>
      <div className="flex items-center justify-between px-4 pt-3">
        {filename && <span className="text-[10px] text-neutral-600 font-mono">{filename}</span>}
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-[10px] text-neutral-700 hover:text-neutral-400 transition-colors ml-auto"
        >
          {copied ? <Check className="h-3 w-3 text-emerald-700" /> : <Copy className="h-3 w-3" />}
          <span>{copied ? 'copied' : 'copy'}</span>
        </button>
      </div>
      <div className="p-4 pt-3 overflow-x-auto">
        <pre>
          <code className="text-[11.5px] font-mono leading-[1.8] text-emerald-700/80 whitespace-pre">{code}</code>
        </pre>
      </div>
    </div>
  );
}
