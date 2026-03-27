'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { ScrollReveal } from '@/components/scroll-reveal';
import { GlitchText } from '@/components/glitch-text';
import { Button } from '@/components/button';
import {
  Download,
  Monitor,
  Laptop,
  Terminal,
  Check,
  Copy,
  Shield,
  ArrowRight,
  AlertTriangle,
  X,
} from 'lucide-react';

const VERSION = '1.2.0';

type Platform = 'windows' | 'macos' | 'linux';

interface PlatformInfo {
  name: string;
  icon: typeof Monitor;
  filename: string;
  size: string;
  endpoint: string;
  instructions: string[];
}

const platforms: Record<Platform, PlatformInfo> = {
  windows: {
    name: 'Windows',
    icon: Monitor,
    filename: `Barracade-${VERSION}-Setup.exe`,
    size: '~85 MB',
    endpoint: '/api/download/windows',
    instructions: [
      'Download the .exe installer.',
      'Run the installer and follow the prompts.',
      'Launch Barracade from the Start menu.',
      'Enter your license key when prompted.',
    ],
  },
  macos: {
    name: 'macOS',
    icon: Laptop,
    filename: `Barracade-${VERSION}.dmg`,
    size: '~92 MB',
    endpoint: '/api/download/macos',
    instructions: [
      'Download the .dmg file.',
      'Open it and drag Barracade to Applications.',
      'Launch Barracade from Applications.',
      'Enter your license key when prompted.',
    ],
  },
  linux: {
    name: 'Linux',
    icon: Terminal,
    filename: `Barracade-${VERSION}.AppImage`,
    size: '~78 MB',
    endpoint: '/api/download/linux',
    instructions: [
      'Download the .AppImage file.',
      'Make it executable: chmod +x Barracade-*.AppImage',
      'Run the AppImage.',
      'Enter your license key when prompted.',
    ],
  },
};

const systemRequirements = [
  { label: 'Windows', value: 'Windows 10 or later (64-bit)' },
  { label: 'macOS', value: 'macOS 12 Monterey or later' },
  { label: 'Linux', value: 'Ubuntu 20.04+, Debian 11+, Fedora 36+, or equivalent' },
  { label: 'RAM', value: '4 GB minimum, 8 GB recommended' },
  { label: 'Storage', value: '500 MB free disk space' },
  { label: 'Network', value: 'Internet connection for license activation and scanning' },
];

function detectPlatform(): Platform {
  if (typeof window === 'undefined') return 'windows';
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('mac')) return 'macos';
  if (ua.includes('linux')) return 'linux';
  return 'windows';
}

export default function DownloadPage() {
  const { data: session, status } = useSession();
  const [detected, setDetected] = useState<Platform>('windows');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<Platform>('windows');
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const p = detectPlatform();
    setDetected(p);
    setActiveTab(p);
  }, []);

  const purchased = session?.user?.purchased;
  const licenseKey = session?.user?.licenseKey;

  function copyLicense() {
    if (!licenseKey) return;
    navigator.clipboard.writeText(licenseKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (status === 'loading') {
    return (
      <>
        <Nav />
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-[14px] text-neutral-600">Loading...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!session) {
    return (
      <>
        <Nav />
        <main className="min-h-screen flex items-center pb-20">
          <div className="mx-auto max-w-6xl px-6 w-full pt-20">
            <div className="max-w-md">
              <h1 className="text-2xl font-medium text-white tracking-tight mb-4">
                Sign in to download
              </h1>
              <p className="text-[14px] text-neutral-500 mb-8 leading-relaxed">
                You need an account to download Barracade.
              </p>
              <Button href="/login?callbackUrl=/download" size="lg">
                Sign in <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!purchased) {
    return (
      <>
        <Nav />
        <main className="min-h-screen flex items-center pb-20">
          <div className="mx-auto max-w-6xl px-6 w-full pt-20">
            <div className="max-w-md">
              <h1 className="text-2xl font-medium text-white tracking-tight mb-4">
                License required
              </h1>
              <p className="text-[14px] text-neutral-500 mb-8 leading-relaxed">
                You need a license before you can download Barracade.
              </p>
              <Button href="/purchase" size="lg">
                Get Barracade for $69.99 <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const primary = platforms[detected];
  const otherPlatforms = (Object.keys(platforms) as Platform[]).filter(
    (p) => p !== detected,
  );

  return (
    <>
      <Nav />

      {/* Download unavailable overlay */}
      {showOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative mx-4 max-w-md w-full rounded-xl border border-amber-900/40 bg-[#0a0a0a] p-8 shadow-2xl shadow-amber-950/20">
            <button
              onClick={() => setShowOverlay(false)}
              className="absolute top-4 right-4 text-neutral-600 hover:text-neutral-400 transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-lg bg-amber-900/20 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
              <h2 className="text-lg font-medium text-white tracking-tight">
                Downloads unavailable
              </h2>
            </div>

            <p className="text-[14px] text-neutral-400 leading-relaxed mb-4">
              Barracade is currently undergoing code-signing verification with
              a trusted certificate authority. Downloads are temporarily
              disabled until this process is complete.
            </p>
            <p className="text-[13px] text-neutral-600 leading-relaxed mb-6">
              This ensures the installer is fully verified and will not be
              flagged by Windows SmartScreen or other OS gatekeepers. Your
              license remains valid and will be ready to use once downloads
              are re-enabled.
            </p>

            <button
              onClick={() => setShowOverlay(false)}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-[13px] text-neutral-300 hover:bg-white/[0.06] transition-colors"
            >
              I understand
            </button>
          </div>
        </div>
      )}

      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          {/* Header */}
          <ScrollReveal>
            <GlitchText
              as="h1"
              className="text-4xl font-medium tracking-tight text-white sm:text-5xl mb-4"
            >
              Download Barracade
            </GlitchText>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-[15px] text-neutral-500 max-w-lg leading-relaxed mb-4">
              Version {VERSION}. Your license is active and ready to use.
            </p>
          </ScrollReveal>

          {/* License key */}
          {licenseKey && (
            <ScrollReveal delay={0.15}>
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4 mb-16 max-w-lg flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] text-neutral-600 mb-1">License Key</p>
                  <p className="text-[14px] font-mono text-emerald-600 tracking-wide">
                    {licenseKey}
                  </p>
                </div>
                <button
                  onClick={copyLicense}
                  className="flex items-center gap-1 text-[11px] text-neutral-700 hover:text-neutral-400 transition-colors shrink-0"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-700" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </ScrollReveal>
          )}

          {/* Primary download */}
          <ScrollReveal delay={0.2}>
            <div className="rounded-lg border border-emerald-900/30 bg-emerald-950/10 p-8 mb-6 max-w-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-emerald-900/20 flex items-center justify-center">
                  <primary.icon className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-[15px] font-medium text-white">
                    Download for {primary.name}
                  </p>
                  <p className="text-[12px] text-neutral-600">
                    {primary.filename} ({primary.size})
                  </p>
                </div>
              </div>
              <a
                href={primary.endpoint}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-6 py-3 text-[14px] font-medium text-white hover:bg-emerald-600 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download
              </a>
            </div>
          </ScrollReveal>

          {/* Other platforms */}
          <ScrollReveal delay={0.25}>
            <div className="flex gap-3 mb-20 max-w-lg">
              {otherPlatforms.map((p) => {
                const info = platforms[p];
                const Icon = info.icon;
                return (
                  <a
                    key={p}
                    href={info.endpoint}
                    className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.01] p-4 hover:border-white/[0.12] transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="h-4 w-4 text-neutral-500" />
                      <span className="text-[13px] text-neutral-300">
                        {info.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-700">
                      {info.filename}
                    </p>
                  </a>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Installation instructions */}
          <ScrollReveal delay={0.3}>
            <h2 className="text-xl font-medium text-white tracking-tight mb-6">
              Installation
            </h2>
            <div className="flex gap-1 mb-6">
              {(Object.keys(platforms) as Platform[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setActiveTab(p)}
                  className={`px-4 py-2 rounded-lg text-[13px] transition-colors ${
                    activeTab === p
                      ? 'bg-white/[0.06] text-white'
                      : 'text-neutral-600 hover:text-neutral-400'
                  }`}
                >
                  {platforms[p].name}
                </button>
              ))}
            </div>
            <ol className="space-y-3 mb-20 max-w-lg">
              {platforms[activeTab].instructions.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-white/[0.06] flex items-center justify-center text-[11px] text-neutral-500 shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-[14px] text-neutral-400 leading-relaxed">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </ScrollReveal>

          {/* System requirements */}
          <ScrollReveal delay={0.35}>
            <h2 className="text-xl font-medium text-white tracking-tight mb-6">
              System requirements
            </h2>
            <div className="grid gap-3 max-w-lg mb-16">
              {systemRequirements.map((req) => (
                <div
                  key={req.label}
                  className="flex items-start gap-4 text-[13px]"
                >
                  <span className="text-neutral-600 w-20 shrink-0">
                    {req.label}
                  </span>
                  <span className="text-neutral-400">{req.value}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Security note */}
          <ScrollReveal delay={0.4}>
            <div className="rounded-lg border border-white/[0.04] bg-white/[0.01] p-6 max-w-lg">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-4 w-4 text-emerald-700" />
                <span className="text-[13px] font-medium text-neutral-300">
                  Verified download
                </span>
              </div>
              <p className="text-[12px] text-neutral-600 leading-relaxed">
                All downloads are served over HTTPS and verified against
                published checksums. The installer is code-signed. Your license
                key authenticates the app on first launch.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
