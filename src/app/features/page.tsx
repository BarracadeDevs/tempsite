import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { FeatureVisual } from '@/components/feature-visual';
import { ScrollReveal } from '@/components/scroll-reveal';
import { CodeBlock } from '@/components/code-block';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features - Barracade',
  description: 'Website scanning, RASP engine, security headers, static analysis, compliance reporting, dependency scanning, and more.',
};
import { CipherText } from '@/components/cipher-text';
import { Button } from '@/components/button';
import { ArrowRight } from 'lucide-react';

const raspConfigCode = `# barracade.rasp.yml
engine:
  mode: enforce          # detect | enforce
  logging: verbose
  
vectors:
  sql-injection:
    enabled: true
    sensitivity: high
    
  xss:
    enabled: true
    sensitivity: high
    contexts: [html, attribute, javascript, url]
    
  ssrf:
    enabled: true
    blocked_ranges:
      - 10.0.0.0/8
      - 172.16.0.0/12
      - 169.254.0.0/16
      
  command-injection:
    enabled: true
    sensitivity: high

  path-traversal:
    enabled: true
    
  prototype-pollution:
    enabled: true
    
  nosql-injection:
    enabled: true
    
  header-injection:
    enabled: true
    
  open-redirect:
    enabled: true
    allowed_domains:
      - example.com
      - *.example.com

exclusions:
  paths: [/health, /metrics, /api/webhooks]
  methods: [OPTIONS]`;

const complianceCode = `$ barracade compliance report --framework soc2

SOC 2 Type II — Coverage Report
Generated: 2026-03-15

CC1.1  Control Environment         ██████████  100%
CC2.1  Communication               ████████░░   82%
CC3.1  Risk Assessment             █████████░   91%
CC4.1  Monitoring Activities       ████████░░   85%
CC5.1  Control Activities          █████████░   94%
CC6.1  Logical Access              ██████████   97%
CC6.2  System Operations           ████████░░   88%
CC6.3  Change Management           █████████░   90%
CC7.1  System Monitoring           █████████░   93%
CC8.1  Incident Management         ████████░░   86%

Overall: 91% coverage (47/52 controls met)
Gaps: 5 controls require remediation
Export: barracade compliance export --format pdf`;

const sastCode = `$ barracade sast scan ./src --languages js,ts,py

Scanning 847 files across 3 languages...

  HIGH   src/api/auth.ts:42
         Hardcoded JWT secret in source code
         → Move to environment variable

  HIGH   src/db/queries.py:118
         SQL query built with string concatenation
         → Use parameterized queries

  MED    src/utils/crypto.ts:23
         Using Math.random() for token generation
         → Use crypto.getRandomValues()

  MED    src/api/upload.ts:67
         No file type validation on upload endpoint
         → Validate MIME type and extension

  LOW    src/config/cors.ts:8
         Wildcard CORS origin in production config
         → Restrict to specific domains

5 findings (2 high, 2 medium, 1 low)
Scanned in 3.2s`;

export default function FeaturesPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-20">
        {/* ── Header ──────────────────────────────────────────── */}
        <div className="relative">
          <div className="hidden lg:block pointer-events-none">
            <Image
              src="/image-removebg-2.png"
              alt=""
              width={650}
              height={650}
              className="absolute right-[-15%] top-[80%] -translate-y-1/2 invert opacity-[0.25] select-none"
              priority
            />
          </div>
          <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-10 mb-20">
            <ScrollReveal>
              <h1 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
                Features
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-5 text-[14px] text-neutral-400 max-w-2xl leading-[1.75]">
                Barracade is a desktop application that covers eight areas of web
                security. Each module works independently. Use one or use all of
                them. Everything runs locally on your machine.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* ── Website Scanner ─────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 border-t border-white/[0.04]">
          <div className="grid lg:grid-cols-[1fr,1.2fr] gap-16 items-start">
            <ScrollReveal>
              <div>
                <h2 className="text-[15px] font-medium text-white mb-4">Website Scanner</h2>
                <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                  The scanner takes any public URL and runs a full security
                  audit against it. It begins by resolving DNS and negotiating a TLS
                  handshake, then inspects every response header, cookie attribute,
                  and exposed endpoint.
                </p>
                <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                  It checks for missing or misconfigured security headers (CSP, HSTS,
                  X-Frame-Options, Referrer-Policy, Permissions-Policy), weak TLS
                  versions, insecure cookie flags, exposed server signatures, directory
                  listings, and platform-specific vulnerabilities for WordPress,
                  Drupal, Joomla, Shopify, and other CMS platforms.
                </p>
                <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                  Each check produces a pass, warning, or fail result. The overall
                  score maps to a letter grade from A (excellent) to F (critical
                  issues). Every finding includes a description of the issue, its
                  severity, and specific remediation steps.
                </p>
                <p className="text-[13px] text-neutral-600 leading-[1.75]">
                  Scans typically complete in under 10 seconds. Results can be
                  exported as JSON or PDF.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <FeatureVisual type="scanner" />
            </ScrollReveal>
          </div>
        </section>

        {/* ── Site Health ─────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 border-t border-white/[0.04]">
          <div className="grid lg:grid-cols-[1.2fr,1fr] gap-16 items-start">
            <ScrollReveal>
              <FeatureVisual type="siteHealth" />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div>
                <h2 className="text-[15px] font-medium text-white mb-4">Site Health Monitoring</h2>
                <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                  Add any number of domains to your monitoring list. Barracade
                  periodically re-scans each one and tracks the security grade
                  over time. You can quickly see which sites are healthy and
                  which need attention.
                </p>
                <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                  Set grade thresholds per domain. If a deploy drops a site below
                  its threshold, you get an alert. This catches regressions: a
                  config change that accidentally removes HSTS, a new endpoint
                  that exposes server info, a certificate nearing expiry.
                </p>
                <p className="text-[13px] text-neutral-600 leading-[1.75]">
                  History is stored locally. View grade trends for any domain over
                  days, weeks, or months.
                </p>
                <div className="mt-6 opacity-0 hover:opacity-30 transition-opacity duration-[3000ms]">
                  <CipherText
                    encrypted="c2VjdXJpdHkgbG9ncyBoaWRlIHRoZSBmaXJzdCBjbHVl"
                    decrypted="SECURITY LOGS HIDE THE FIRST CLUE"
                    hint="Not all archives are meant to be found"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Headers Generator ───────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 border-t border-white/[0.04]">
          <div className="grid lg:grid-cols-[1fr,1.2fr] gap-16 items-start">
            <ScrollReveal>
              <div>
                <h2 className="text-[15px] font-medium text-white mb-4">Headers Generator</h2>
                <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                  Security headers are one of the simplest and most effective
                  defenses for any web application, but getting them right across
                  different deployment targets is tedious. The headers generator
                  lets you pick which headers you need and produces platform-specific
                  configuration you can paste directly into your project.
                </p>
                <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                  Supported headers include Content-Security-Policy,
                  Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options,
                  Referrer-Policy, Permissions-Policy, and Cross-Origin headers
                  (CORP, COEP, COOP).
                </p>
                <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                  Output formats cover Next.js (<span className="font-mono text-[12px] text-neutral-600">next.config.js</span>),
                  Vercel (<span className="font-mono text-[12px] text-neutral-600">vercel.json</span>),
                  Netlify (<span className="font-mono text-[12px] text-neutral-600">_headers</span>),
                  Express middleware, Nginx directives, Apache
                  <span className="font-mono text-[12px] text-neutral-600"> .htaccess</span>,
                  Caddy, and Cloudflare Workers.
                </p>
                <p className="text-[13px] text-neutral-600 leading-[1.75]">
                  CSP generation includes a policy builder that lets you define
                  allowed sources per directive. It warns about overly permissive
                  policies like <span className="font-mono text-[12px]">unsafe-inline</span> or
                  wildcard sources.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <FeatureVisual type="headers" />
            </ScrollReveal>
          </div>
        </section>

        {/* ── RASP Engine ─────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 border-t border-white/[0.04]">
          <ScrollReveal>
            <h2 className="text-[15px] font-medium text-white mb-4">RASP Engine</h2>
            <p className="text-[13px] text-neutral-500 leading-[1.75] max-w-2xl mb-4">
              Runtime Application Self-Protection. The RASP engine integrates at
              the application layer and inspects every incoming HTTP request in
              real time. Unlike a WAF, which operates at the network perimeter,
              RASP has access to the full application context. It sees the parsed
              request body, the route being accessed, and the database queries
              being constructed.
            </p>
            <p className="text-[13px] text-neutral-500 leading-[1.75] max-w-2xl mb-12">
              The engine runs in two modes: <span className="text-neutral-400">detect</span> (logs
              threats without blocking, useful during rollout) and <span className="text-neutral-400">enforce</span> (blocks
              malicious requests and returns a 403). Sensitivity can be tuned per
              vector and per route. Paths like health checks and webhook endpoints
              can be excluded entirely.
            </p>
          </ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-12">
            <ScrollReveal delay={0.05}>
              <CodeBlock code={raspConfigCode} filename="barracade.rasp.yml" />
              <div className="mt-6 opacity-0 hover:opacity-30 transition-opacity duration-[3000ms]">
                <CipherText
                  encrypted="3078366130396536363762623637616538353863666135613763"
                  decrypted="0x6a09e667bb67ae858cfa5a7c"
                  hint="IV constants hide in familiar places"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <FeatureVisual type="rasp" />
              <div className="mt-8">
                <h3 className="text-[12px] font-medium text-neutral-400 mb-4 tracking-wide uppercase">
                  Coverage
                </h3>
                <div className="space-y-0">
                  {[
                    'SQL Injection|parameterized query enforcement, union-based and blind detection',
                    'XSS|context-aware detection across HTML, attributes, JS, and URL contexts',
                    'SSRF|blocks private IP ranges, cloud metadata endpoints, DNS rebinding',
                    'Command Injection|shell metacharacter detection, argument injection',
                    'Path Traversal|normalized path analysis, null byte injection, encoding bypass',
                    'Prototype Pollution|__proto__, constructor.prototype, Object.assign abuse',
                    'NoSQL Injection|MongoDB operator injection ($gt, $ne, $regex)',
                    'Header Injection|CRLF detection, response splitting prevention',
                    'Open Redirects|allowlist enforcement, protocol validation',
                  ].map((line) => {
                    const [name, desc] = line.split('|');
                    return (
                      <div key={name} className="flex items-start gap-3 py-2 border-b border-white/[0.03] last:border-0">
                        <span className="text-[10px] font-mono text-emerald-800 mt-0.5 shrink-0">{'>'}</span>
                        <div>
                          <span className="text-[12px] text-neutral-400">{name}</span>
                          <span className="text-[11px] text-neutral-700 ml-2">{desc}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Defense Engine ───────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 border-t border-white/[0.04]">
          <div className="grid lg:grid-cols-[1.2fr,1fr] gap-16 items-start">
            <ScrollReveal>
              <FeatureVisual type="defense" />
              <div className="mt-8">
                <h3 className="text-[12px] font-medium text-neutral-400 mb-4 tracking-wide uppercase">
                  Policy actions
                </h3>
                <div className="space-y-3 text-[12px]">
                  <div className="flex gap-3">
                    <span className="text-neutral-500 w-16 shrink-0">Block</span>
                    <span className="text-neutral-700">Immediately reject the request with a 403 response.</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-neutral-500 w-16 shrink-0">Throttle</span>
                    <span className="text-neutral-700">Reduce request rate for the source IP. Configurable window and limit.</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-neutral-500 w-16 shrink-0">Isolate</span>
                    <span className="text-neutral-700">Route traffic to a sandboxed environment for analysis.</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-neutral-500 w-16 shrink-0">Alert</span>
                    <span className="text-neutral-700">Log the event and send a notification. No traffic modification.</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div>
                <h2 className="text-[15px] font-medium text-white mb-4">Defense Engine</h2>
                <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                  The defense engine sits on top of RASP and adds policy-based
                  response logic. While RASP detects the attack, defense policies
                  determine what happens next. You define rules that map threat
                  types, severity levels, and source characteristics to specific
                  actions.
                </p>
                <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                  Policies can be layered. A first offense might trigger an alert,
                  a second offense throttles the source, a third blocks it. IP
                  reputation, geographic origin, request frequency, and payload
                  characteristics can all feed into policy decisions.
                </p>
                <p className="text-[13px] text-neutral-600 leading-[1.75]">
                  Every action is written to an append-only audit log with full
                  request context: timestamp, source IP, matched rule, action taken,
                  and the raw payload that triggered it.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── SAST ────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 border-t border-white/[0.04]">
          <div className="grid lg:grid-cols-[1fr,1.2fr] gap-16 items-start">
            <ScrollReveal>
              <div>
                <h2 className="text-[15px] font-medium text-white mb-4">Static Analysis (SAST)</h2>
                <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                  Point Barracade at a directory and it scans every source file for
                  security issues. It builds an abstract syntax tree for each
                  supported language and runs pattern-based and data-flow rules
                  against it.
                </p>
                <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                  Supported languages: JavaScript, TypeScript, Python, Go, Rust,
                  Java, C#, and PHP. Each language has its own rule set covering
                  language-specific pitfalls, including <span className="font-mono text-[12px] text-neutral-600">eval()</span> in
                  JS, <span className="font-mono text-[12px] text-neutral-600">pickle.loads()</span> in
                  Python, <span className="font-mono text-[12px] text-neutral-600">unsafe { }</span> blocks in Rust, etc.
                </p>
                <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                  Common findings include hardcoded credentials, SQL queries built
                  with string concatenation, use of weak cryptographic functions,
                  missing input validation, unrestricted file uploads, and insecure
                  deserialization.
                </p>
                <p className="text-[13px] text-neutral-600 leading-[1.75]">
                  Results are classified as High, Medium, or Low severity. Each
                  finding links to the exact file and line number, with a plain-English
                  explanation and fix suggestion. Export as SARIF for GitHub Advanced
                  Security or any SARIF-compatible tool.
                </p>
                <div className="mt-6 opacity-0 hover:opacity-30 transition-opacity duration-[3000ms]">
                  <CipherText
                    encrypted="dXAvdXAvZG93bi9kb3duL2xlZnQvcmlnaHQ="
                    decrypted="SOME CODES ARE ENTERED NOT TYPED"
                    hint="A classic sequence opens a hidden door"
                  />
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <CodeBlock code={sastCode} filename="terminal" />
              <div className="mt-6">
                <FeatureVisual type="sast" />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Compliance ──────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 border-t border-white/[0.04]">
          <div className="grid lg:grid-cols-[1.2fr,1fr] gap-16 items-start">
            <ScrollReveal>
              <CodeBlock code={complianceCode} filename="terminal" />
              <div className="mt-6">
                <FeatureVisual type="compliance" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div>
                <h2 className="text-[15px] font-medium text-white mb-4">Compliance Reporting</h2>
                <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                  Barracade maps all of its findings (scan results, RASP
                  configuration, SAST output, and dependency status) against
                  industry compliance frameworks: SOC 2, PCI-DSS, HIPAA, and
                  CIS Benchmarks.
                </p>
                <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                  For each framework, the compliance view breaks down individual
                  controls. A control is marked as met if the relevant checks
                  pass, partially met if some checks pass, and unmet if critical
                  checks fail. You can drill into any control to see exactly which
                  findings affect it.
                </p>
                <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                  Compliance data updates as you fix findings and re-scan.
                  Coverage percentages reflect your current state automatically. This lets you track
                  remediation progress toward a compliance target.
                </p>
                <p className="text-[13px] text-neutral-600 leading-[1.75]">
                  Export reports as PDF for auditors or as JSON for programmatic
                  consumption. Reports include executive summaries, per-control
                  breakdowns, and evidence references.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Dependencies ────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 border-t border-white/[0.04]">
          <div className="grid lg:grid-cols-[1fr,1.2fr] gap-16 items-start">
            <ScrollReveal>
              <div>
                <h2 className="text-[15px] font-medium text-white mb-4">Dependencies &amp; SBOM</h2>
                <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                  Generates a complete software bill of materials from your project.
                  Barracade parses lock files (<span className="font-mono text-[12px] text-neutral-600">package-lock.json</span>,
                  <span className="font-mono text-[12px] text-neutral-600"> yarn.lock</span>,
                  <span className="font-mono text-[12px] text-neutral-600"> Pipfile.lock</span>,
                  <span className="font-mono text-[12px] text-neutral-600"> go.sum</span>,
                  <span className="font-mono text-[12px] text-neutral-600"> Cargo.lock</span>) and
                  builds a full dependency tree including transitive dependencies.
                </p>
                <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                  Each package is cross-referenced against the National Vulnerability
                  Database (NVD) and GitHub Security Advisories for known CVEs. Results
                  include CVE identifiers, severity scores, affected version ranges,
                  and the minimum version that fixes the vulnerability.
                </p>
                <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                  Typosquat detection flags packages with names suspiciously similar
                  to popular libraries. License auditing checks each dependency against
                  your allowed license list and flags conflicts.
                </p>
                <p className="text-[13px] text-neutral-600 leading-[1.75]">
                  Export the SBOM as CycloneDX or SPDX format.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <FeatureVisual type="dependencies" />
            </ScrollReveal>
          </div>
        </section>

        {/* Puzzle breadcrumbs */}
        <div className="mx-auto max-w-7xl px-6 lg:px-10 mt-12 flex justify-between">
          <div className="opacity-0 hover:opacity-25 transition-opacity duration-[3000ms]">
            <CipherText
              encrypted="62623637616538350000"
              decrypted="BB67AE85"
              hint="Second word of the sequence"
            />
          </div>
          <div className="opacity-0 hover:opacity-25 transition-opacity duration-[3000ms]">
            <CipherText
              encrypted="01000010 01010010 01000011 01000100"
              decrypted="BRCD"
              hint="Four letters begin the key"
            />
          </div>
        </div>

        {/* ── CTA ─────────────────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-6 lg:px-10 mt-20 pt-16 border-t border-white/[0.04]">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <p className="text-[14px] text-neutral-300">$69.99, one-time</p>
                <p className="text-[12px] text-neutral-600 mt-1">Lifetime license. All platforms. Every future update.</p>
              </div>
              <Button href="/purchase" size="md">
                Download <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </>
  );
}