'use client';

import { useEffect, useRef, useState } from 'react';

interface FeatureVisualProps {
  type: 'scanner' | 'siteHealth' | 'headers' | 'rasp' | 'defense' | 'sast' | 'compliance' | 'dependencies';
}

function ScannerVisual() {
  const [phase, setPhase] = useState<'idle' | 'scanning' | 'done'>('idle');
  const [visibleChecks, setVisibleChecks] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const checks = [
    { label: 'TLS 1.3', pass: true },
    { label: 'Strict-Transport-Security', pass: true },
    { label: 'Content-Security-Policy', pass: false },
    { label: 'X-Frame-Options', pass: true },
    { label: 'X-Content-Type-Options', pass: true },
    { label: 'Permissions-Policy', pass: false },
    { label: 'Referrer-Policy', pass: true },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase('scanning');
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (phase !== 'scanning') return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    checks.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleChecks(i + 1);
          if (i === checks.length - 1) setPhase('done');
        }, 300 + i * 200)
      );
    });
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  return (
    <div ref={ref} className="min-h-[200px]">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[10px] font-mono text-neutral-700">target</span>
        <span className="text-[11px] font-mono text-neutral-600">https://example.com</span>
        {phase === 'scanning' && (
          <span className="inline-block w-1 h-3 bg-emerald-900 animate-pulse" />
        )}
      </div>
      <div className="flex items-start gap-8 mb-6">
        <div
          className={`text-[42px] font-bold leading-none transition-all duration-700 ${
            phase === 'done' ? 'text-neutral-400' : 'text-neutral-800'
          }`}
        >
          A
        </div>
        <div className="flex-1 space-y-1 pt-1">
          {checks.map((check, i) => (
            <div
              key={check.label}
              className={`flex items-center justify-between text-[11px] font-mono transition-opacity duration-300 ${
                i < visibleChecks ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <span className="text-neutral-600">{check.label}</span>
              <span className={check.pass ? 'text-emerald-900' : 'text-red-900/80'}>
                {check.pass ? 'pass' : 'fail'}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`text-[10px] font-mono text-neutral-700 pt-3 border-t border-white/[0.03] transition-opacity duration-500 ${
          phase === 'done' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        5 passed · 2 failed · 94/100
      </div>
    </div>
  );
}

function SiteHealthVisual() {
  const sites = [
    { domain: 'app.example.com', grade: 'A', trend: [88, 90, 91, 94, 94], ok: true },
    { domain: 'api.example.com', grade: 'B+', trend: [82, 85, 84, 86, 87], ok: true },
    { domain: 'docs.example.com', grade: 'A−', trend: [90, 92, 91, 93, 92], ok: true },
    { domain: 'staging.example.com', grade: 'C', trend: [74, 72, 68, 65, 62], ok: false },
  ];

  return (
    <div>
      {sites.map((site) => (
        <div
          key={site.domain}
          className="flex items-center gap-3 py-2.5 border-b border-white/[0.03] last:border-0"
        >
          <div
            className={`h-1.5 w-1.5 rounded-full shrink-0 ${
              site.ok ? 'bg-emerald-900' : 'bg-red-900/80 animate-pulse'
            }`}
          />
          <span className="text-[11px] font-mono text-neutral-600 flex-1">{site.domain}</span>
          <div className="flex items-end gap-px h-4">
            {site.trend.map((v, i) => (
              <div
                key={i}
                className={`w-1 rounded-sm ${
                  site.ok ? 'bg-emerald-900/60' : 'bg-red-900/40'
                }`}
                style={{ height: `${Math.round((v / 100) * 16)}px` }}
              />
            ))}
          </div>
          <span
            className={`w-6 text-right text-[11px] font-mono ${
              site.ok ? 'text-neutral-600' : 'text-red-800/70'
            }`}
          >
            {site.grade}
          </span>
        </div>
      ))}
    </div>
  );
}

function HeadersVisual() {
  const headers = [
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=()' },
    { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self'" },
  ];

  return (
    <div>
      {headers.map((h) => (
        <div key={h.key} className="py-1.5 border-b border-white/[0.02] last:border-0">
          <div className="text-[11px] font-mono text-emerald-900/80">{h.key}</div>
          <div className="text-[10px] font-mono text-neutral-700 mt-0.5 truncate">{h.value}</div>
        </div>
      ))}
    </div>
  );
}

function RaspVisual() {
  const allEvents = [
    { time: '00:00', type: 'SQLi', path: '/api/users' },
    { time: '00:04', type: 'XSS', path: '/search' },
    { time: '01:12', type: 'Path Traversal', path: '/files' },
    { time: '03:07', type: 'SSRF', path: '/api/fetch' },
    { time: '05:11', type: 'Cmd Injection', path: '/exec' },
  ];

  const [count, setCount] = useState(3);

  useEffect(() => {
    const t = setInterval(() => {
      setCount((c) => (c >= allEvents.length ? 1 : c + 1));
    }, 2200);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shown = allEvents.slice(0, count);

  return (
    <div className="min-h-[120px]">
      {shown.map((e, i) => (
        <div
          key={`${e.time}-${i}`}
          className="grid grid-cols-[3rem,7rem,1fr,4rem] gap-2 py-1.5 border-b border-white/[0.03] last:border-0 text-[11px] font-mono"
          style={{ opacity: Math.max(0.2, 1 - (shown.length - 1 - i) * 0.22) }}
        >
          <span className="text-neutral-700">{e.time}</span>
          <span className="text-red-900/80">{e.type}</span>
          <span className="text-neutral-700 truncate">{e.path}</span>
          <span className="text-emerald-900 text-right">blocked</span>
        </div>
      ))}
    </div>
  );
}

function DefenseVisual() {
  const policies = [
    { name: 'Rate Limit', trigger: '> 100/min', action: 'throttle' },
    { name: 'Brute Force', trigger: '5 failures', action: 'block IP' },
    { name: 'SQLi / XSS', trigger: 'high conf.', action: 'block + log' },
    { name: 'Geo Restrict', trigger: 'blocked region', action: 'deny' },
  ];

  return (
    <div>
      {policies.map((p) => (
        <div
          key={p.name}
          className="flex items-baseline gap-3 py-2 border-b border-white/[0.03] last:border-0 text-[11px] font-mono"
        >
          <span className="text-neutral-500 w-24 shrink-0">{p.name}</span>
          <span className="text-neutral-700 flex-1">{p.trigger}</span>
          <span className="text-emerald-900">{p.action}</span>
        </div>
      ))}
    </div>
  );
}

function SastVisual() {
  const findings = [
    { severity: 'high', file: 'auth/login.js', line: 42, issue: 'hardcoded secret' },
    { severity: 'med', file: 'api/handler.py', line: 118, issue: 'unsafe deserialization' },
    { severity: 'med', file: 'utils/db.ts', line: 67, issue: 'string-built SQL query' },
    { severity: 'low', file: 'utils/parse.ts', line: 23, issue: 'prototype pollution risk' },
  ];

  const sevColor: Record<string, string> = {
    high: 'text-red-800/80',
    med: 'text-amber-800/70',
    low: 'text-neutral-600',
  };

  return (
    <div>
      {findings.map((f, i) => (
        <div key={i} className="py-2 border-b border-white/[0.03] last:border-0">
          <div className="flex items-center gap-2 text-[11px] font-mono">
            <span className={`w-8 shrink-0 ${sevColor[f.severity]}`}>{f.severity}</span>
            <span className="text-neutral-600">{f.file}</span>
            <span className="text-neutral-700">:{f.line}</span>
          </div>
          <div className="text-[10px] font-mono text-neutral-700 mt-0.5 pl-10">{f.issue}</div>
        </div>
      ))}
    </div>
  );
}

function ComplianceVisual() {
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setReady(true), 150);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const frameworks = [
    { name: 'SOC 2', pct: 87 },
    { name: 'PCI-DSS', pct: 92 },
    { name: 'HIPAA', pct: 78 },
    { name: 'CIS', pct: 95 },
  ];

  return (
    <div ref={ref} className="space-y-5">
      {frameworks.map((fw) => (
        <div key={fw.name}>
          <div className="flex justify-between text-[11px] font-mono mb-2">
            <span className="text-neutral-600">{fw.name}</span>
            <span className="text-neutral-600">{fw.pct}%</span>
          </div>
          <div className="h-px bg-white/[0.04] relative">
            <div
              className="absolute top-0 left-0 h-px bg-emerald-900/80 transition-all duration-[1200ms] ease-out"
              style={{ width: ready ? `${fw.pct}%` : '0%' }}
            />
            <div
              className="absolute top-[-1px] h-[3px] w-px bg-emerald-700/50 transition-all duration-[1200ms] ease-out"
              style={{ left: ready ? `${fw.pct}%` : '0%' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function DependenciesVisual() {
  const deps = [
    { name: 'lodash', version: '4.17.20', vulns: 2, sev: 'high' },
    { name: 'express', version: '4.18.2', vulns: 0, sev: 'none' },
    { name: 'jsonwebtoken', version: '8.5.1', vulns: 1, sev: 'med' },
    { name: 'axios', version: '1.6.0', vulns: 0, sev: 'none' },
    { name: 'dotenv', version: '16.0.3', vulns: 0, sev: 'none' },
  ];

  return (
    <div>
      {deps.map((d) => (
        <div
          key={d.name}
          className="flex items-center gap-3 py-2 border-b border-white/[0.03] last:border-0 text-[11px] font-mono"
        >
          <span className="text-neutral-500 w-28 shrink-0">{d.name}</span>
          <span className="text-neutral-700 flex-1">{d.version}</span>
          {d.vulns > 0 ? (
            <span className={d.sev === 'high' ? 'text-red-800/80' : 'text-amber-800/70'}>
              {d.vulns} CVE{d.vulns > 1 ? 's' : ''}
            </span>
          ) : (
            <span className="text-neutral-700">clean</span>
          )}
        </div>
      ))}
    </div>
  );
}

const components: Record<FeatureVisualProps['type'], () => React.JSX.Element> = {
  scanner: ScannerVisual,
  siteHealth: SiteHealthVisual,
  headers: HeadersVisual,
  rasp: RaspVisual,
  defense: DefenseVisual,
  sast: SastVisual,
  compliance: ComplianceVisual,
  dependencies: DependenciesVisual,
};

export function FeatureVisual({ type }: FeatureVisualProps) {
  const Visual = components[type];
  return (
    <div className="rounded-lg border border-white/[0.06] bg-[#0a0a0a] p-4 overflow-hidden">
      <Visual />
    </div>
  );
}
