'use client';

import { InteractiveCard } from '@/components/interactive-card';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Shield, Zap, Lock, Eye, Globe, Bug } from 'lucide-react';

const capabilities = [
  { icon: Globe, label: 'Website Scanner', desc: 'Full security audit on any URL. Headers, TLS, cookies, endpoints. Letter grade A through F.' },
  { icon: Shield, label: 'RASP Engine', desc: 'Runtime protection for SQL injection, XSS, SSRF, command injection, path traversal, and more.' },
  { icon: Zap, label: 'Defense Engine', desc: 'Policy-based response to threats. Block, throttle, or isolate. Full audit log for every action.' },
  { icon: Eye, label: 'Static Analysis', desc: 'Scan source code across 8 languages. Finds hardcoded secrets, injection risks, unsafe patterns.' },
  { icon: Lock, label: 'Compliance', desc: 'Map against CIS, PCI-DSS, HIPAA, SOC 2. Track coverage and export audit-ready reports.' },
  { icon: Bug, label: 'Dependencies', desc: 'SBOM generation, CVE tracking, typosquat detection, and license auditing for your dependency tree.' },
];

export function CapabilitiesGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {capabilities.map((cap, i) => (
        <ScrollReveal key={cap.label} delay={i * 0.05}>
          <InteractiveCard
            icon={cap.icon}
            label={cap.label}
            desc={cap.desc}
          />
        </ScrollReveal>
      ))}
    </div>
  );
}
