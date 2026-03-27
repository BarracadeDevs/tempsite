import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { ScrollReveal } from '@/components/scroll-reveal';
import { CodeBlock } from '@/components/code-block';
import { Button } from '@/components/button';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation - Barracade',
  description: 'Installation guides, configuration references, and usage documentation for Barracade desktop security software.',
};

const installSteps = `# Download and install Barracade

# Windows (installer)
barracade-setup.exe

# macOS
brew install barracade

# Linux (Debian/Ubuntu)
sudo dpkg -i barracade_1.2_amd64.deb

# Linux (Fedora/Arch)
sudo rpm -i barracade-1.2.x86_64.rpm`;

const scannerUsage = `# Scan a single URL
barracade scan https://example.com

# Scan with JSON output
barracade scan https://example.com --format json

# Scan multiple domains from a file
barracade scan --list domains.txt

# Scan and export PDF report
barracade scan https://example.com --export report.pdf`;

const raspConfig = `# barracade.rasp.yml
engine:
  mode: enforce          # detect | enforce
  logging: verbose

vectors:
  sql-injection:
    enabled: true
    sensitivity: high
  xss:
    enabled: true
    contexts: [html, attribute, javascript, url]
  ssrf:
    enabled: true
    blocked_ranges:
      - 10.0.0.0/8
      - 172.16.0.0/12
      - 169.254.0.0/16
  command-injection:
    enabled: true
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
      - yourdomain.com

exclusions:
  paths: [/health, /metrics]
  methods: [OPTIONS]`;

const headersUsage = `# Generate security headers for Next.js
barracade headers --platform nextjs

# Generate for Nginx with strict CSP
barracade headers --platform nginx --csp strict

# Generate for Vercel with all headers
barracade headers --platform vercel --all

# Supported platforms:
#   nextjs, vercel, netlify, express,
#   nginx, apache, caddy, cloudflare`;

const sastUsage = `# Scan current directory
barracade sast scan ./src

# Scan specific languages
barracade sast scan ./src --languages js,ts,py

# Export as SARIF for GitHub Advanced Security
barracade sast scan ./src --format sarif --output results.sarif

# Scan with custom rules
barracade sast scan ./src --rules ./custom-rules.yml`;

const complianceUsage = `# Generate SOC 2 compliance report
barracade compliance report --framework soc2

# Generate PCI-DSS report
barracade compliance report --framework pci-dss

# Export audit-ready PDF
barracade compliance report --framework hipaa --export audit.pdf

# Check coverage against all frameworks
barracade compliance status`;

const dependencyUsage = `# Scan dependencies for vulnerabilities
barracade deps scan

# Generate SBOM in CycloneDX format
barracade deps sbom --format cyclonedx

# Generate SBOM in SPDX format
barracade deps sbom --format spdx

# Check for typosquat packages
barracade deps audit --typosquat

# License compliance check
barracade deps licenses --allowed MIT,Apache-2.0,BSD-3-Clause`;

const licenseUsage = `# Activate your license
barracade activate BRCD-XXXX-XXXX-XXXX-XXXX

# Check license status
barracade license status

# Deactivate (for transferring to another machine)
barracade license deactivate`;

export default function DocsPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6">

          {/* Header */}
          <ScrollReveal>
            <h1 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
              Documentation
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-5 text-[14px] text-neutral-400 max-w-2xl leading-[1.75]">
              Everything you need to install, configure, and use Barracade.
              The desktop app runs locally on your machine. All scanning,
              analysis, and reporting happens on your hardware.
            </p>
          </ScrollReveal>

          {/* Table of Contents */}
          <ScrollReveal delay={0.15}>
            <nav className="mt-12 mb-20 border border-white/[0.04] rounded-lg p-6 bg-white/[0.01]">
              <h2 className="text-[12px] font-medium text-neutral-500 uppercase tracking-wide mb-4">On this page</h2>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                {[
                  { href: '#installation', label: 'Installation' },
                  { href: '#license-activation', label: 'License activation' },
                  { href: '#website-scanner', label: 'Website scanner' },
                  { href: '#rasp-engine', label: 'RASP engine' },
                  { href: '#security-headers', label: 'Security headers' },
                  { href: '#static-analysis', label: 'Static analysis' },
                  { href: '#compliance', label: 'Compliance reporting' },
                  { href: '#dependencies', label: 'Dependencies and SBOM' },
                  { href: '#configuration', label: 'Configuration reference' },
                  { href: '#system-requirements', label: 'System requirements' },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-[13px] text-neutral-600 hover:text-neutral-300 transition-colors py-1"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>
          </ScrollReveal>

          {/* Installation */}
          <section id="installation" className="mb-20 scroll-mt-24">
            <ScrollReveal>
              <h2 className="text-[15px] font-medium text-white mb-4">Installation</h2>
              <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                Download the installer for your platform from the <a href="/download" className="text-neutral-400 hover:text-white transition-colors underline underline-offset-2">download page</a> after
                purchasing a license. Barracade supports Windows 10+, macOS 12+, and
                most Linux distributions.
              </p>
              <p className="text-[13px] text-neutral-500 leading-[1.75] mb-6">
                On macOS, you can also install via Homebrew. On Linux, .deb and .rpm
                packages are available. The installer adds the <span className="font-mono text-[12px] text-neutral-600">barracade</span> command
                to your PATH automatically.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <CodeBlock code={installSteps} filename="terminal" />
            </ScrollReveal>
          </section>

          {/* License Activation */}
          <section id="license-activation" className="mb-20 scroll-mt-24">
            <ScrollReveal>
              <h2 className="text-[15px] font-medium text-white mb-4">License activation</h2>
              <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                After installation, activate your license key. The key is displayed
                on the purchase confirmation page and sent to your email. Each license
                is valid for one machine at a time. You can deactivate and transfer
                to another machine at any point.
              </p>
              <p className="text-[13px] text-neutral-500 leading-[1.75] mb-6">
                The license is a lifetime purchase. You receive every future update
                at no additional cost. No subscriptions, no renewals.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <CodeBlock code={licenseUsage} filename="terminal" />
            </ScrollReveal>
          </section>

          {/* Website Scanner */}
          <section id="website-scanner" className="mb-20 scroll-mt-24">
            <ScrollReveal>
              <h2 className="text-[15px] font-medium text-white mb-4">Website scanner</h2>
              <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                The scanner takes a public URL and runs a security audit against it.
                It resolves DNS, negotiates TLS, inspects response headers, checks
                cookie attributes, probes for exposed endpoints, and tests for
                platform-specific issues.
              </p>
              <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                Results are scored from A (excellent) to F (critical issues). Each
                finding includes a severity level, a description, and specific steps
                to fix the issue.
              </p>
              <div className="text-[13px] text-neutral-600 leading-[1.75] mb-6">
                <p className="font-medium text-neutral-500 mb-2">Checks include:</p>
                <ul className="list-none space-y-1">
                  <li>Security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy)</li>
                  <li>TLS version and cipher strength</li>
                  <li>Cookie flags (Secure, HttpOnly, SameSite)</li>
                  <li>Exposed server signatures and version strings</li>
                  <li>Directory listings and backup files</li>
                  <li>CMS-specific vulnerabilities (WordPress, Drupal, Shopify, etc.)</li>
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <CodeBlock code={scannerUsage} filename="terminal" />
            </ScrollReveal>
          </section>

          {/* RASP Engine */}
          <section id="rasp-engine" className="mb-20 scroll-mt-24">
            <ScrollReveal>
              <h2 className="text-[15px] font-medium text-white mb-4">RASP engine</h2>
              <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                Runtime Application Self-Protection. The RASP engine integrates at the
                application layer and inspects every incoming HTTP request. It parses
                payloads, query strings, headers, and request bodies against known
                attack signatures and behavioral heuristics.
              </p>
              <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                Two modes are available: <span className="text-neutral-400">detect</span> logs threats
                without blocking (useful during initial rollout), and <span className="text-neutral-400">enforce</span> blocks
                malicious requests with a 403 response. Sensitivity is tunable per
                vector and per route.
              </p>
              <p className="text-[13px] text-neutral-600 leading-[1.75] mb-6">
                Covered vectors: SQL injection, XSS, SSRF, command injection, path
                traversal, prototype pollution, NoSQL injection, header injection,
                and open redirects.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <CodeBlock code={raspConfig} filename="barracade.rasp.yml" />
            </ScrollReveal>
          </section>

          {/* Security Headers */}
          <section id="security-headers" className="mb-20 scroll-mt-24">
            <ScrollReveal>
              <h2 className="text-[15px] font-medium text-white mb-4">Security headers</h2>
              <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                The headers generator produces deployment-ready configuration for your
                platform. Select the headers you need and Barracade outputs the correct
                syntax for your server or framework.
              </p>
              <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                Supported headers: Content-Security-Policy, Strict-Transport-Security,
                X-Frame-Options, X-Content-Type-Options, Referrer-Policy,
                Permissions-Policy, and Cross-Origin headers (CORP, COEP, COOP).
              </p>
              <p className="text-[13px] text-neutral-600 leading-[1.75] mb-6">
                The CSP builder lets you define allowed sources per directive and warns
                about overly permissive policies.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <CodeBlock code={headersUsage} filename="terminal" />
            </ScrollReveal>
          </section>

          {/* Static Analysis */}
          <section id="static-analysis" className="mb-20 scroll-mt-24">
            <ScrollReveal>
              <h2 className="text-[15px] font-medium text-white mb-4">Static analysis</h2>
              <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                Scans source code for security issues across JavaScript, TypeScript,
                Python, Go, Rust, Java, C#, and PHP. Each language has its own rule
                set covering language-specific patterns.
              </p>
              <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                Findings include file paths, line numbers, severity ratings (High,
                Medium, Low), and specific remediation steps. Results can be exported
                as SARIF for integration with GitHub Advanced Security and other
                SARIF-compatible tools.
              </p>
              <p className="text-[13px] text-neutral-600 leading-[1.75] mb-6">
                Common findings: hardcoded credentials, SQL concatenation, weak crypto
                functions, missing input validation, unrestricted file uploads, and
                insecure deserialization.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <CodeBlock code={sastUsage} filename="terminal" />
            </ScrollReveal>
          </section>

          {/* Compliance */}
          <section id="compliance" className="mb-20 scroll-mt-24">
            <ScrollReveal>
              <h2 className="text-[15px] font-medium text-white mb-4">Compliance reporting</h2>
              <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                Maps scan results, RASP configuration, SAST output, and dependency
                status against SOC 2, PCI-DSS, HIPAA, and CIS Benchmarks. Each
                control is marked as met, partially met, or unmet based on your
                current findings.
              </p>
              <p className="text-[13px] text-neutral-600 leading-[1.75] mb-6">
                Coverage percentages update as you fix findings and re-scan. Export
                audit-ready PDFs or JSON for programmatic consumption.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <CodeBlock code={complianceUsage} filename="terminal" />
            </ScrollReveal>
          </section>

          {/* Dependencies */}
          <section id="dependencies" className="mb-20 scroll-mt-24">
            <ScrollReveal>
              <h2 className="text-[15px] font-medium text-white mb-4">Dependencies and SBOM</h2>
              <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                Parses your lock files and builds a complete dependency tree including
                transitive dependencies. Each package is checked against the National
                Vulnerability Database and GitHub Security Advisories for known CVEs.
              </p>
              <p className="text-[13px] text-neutral-500 leading-[1.75] mb-4">
                Typosquat detection flags packages with names similar to popular
                libraries. License auditing checks each dependency against your
                allowed license list.
              </p>
              <p className="text-[13px] text-neutral-600 leading-[1.75] mb-6">
                Supported lock files: package-lock.json, yarn.lock, pnpm-lock.yaml,
                Pipfile.lock, go.sum, Cargo.lock. Export as CycloneDX or SPDX.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <CodeBlock code={dependencyUsage} filename="terminal" />
            </ScrollReveal>
          </section>

          {/* Configuration Reference */}
          <section id="configuration" className="mb-20 scroll-mt-24">
            <ScrollReveal>
              <h2 className="text-[15px] font-medium text-white mb-4">Configuration reference</h2>
              <p className="text-[13px] text-neutral-500 leading-[1.75] mb-6">
                Barracade reads configuration from a <span className="font-mono text-[12px] text-neutral-600">barracade.yml</span> file
                in your project root. All settings can also be passed as CLI flags.
              </p>
              <div className="space-y-4 text-[13px]">
                <div className="border-b border-white/[0.04] pb-3">
                  <span className="font-mono text-[12px] text-neutral-400">engine.mode</span>
                  <p className="text-neutral-600 mt-1">RASP operation mode. Values: <span className="font-mono text-[11px]">detect</span>, <span className="font-mono text-[11px]">enforce</span>. Default: <span className="font-mono text-[11px]">detect</span>.</p>
                </div>
                <div className="border-b border-white/[0.04] pb-3">
                  <span className="font-mono text-[12px] text-neutral-400">engine.logging</span>
                  <p className="text-neutral-600 mt-1">Log verbosity. Values: <span className="font-mono text-[11px]">quiet</span>, <span className="font-mono text-[11px]">normal</span>, <span className="font-mono text-[11px]">verbose</span>. Default: <span className="font-mono text-[11px]">normal</span>.</p>
                </div>
                <div className="border-b border-white/[0.04] pb-3">
                  <span className="font-mono text-[12px] text-neutral-400">vectors.&lt;name&gt;.sensitivity</span>
                  <p className="text-neutral-600 mt-1">Detection sensitivity per vector. Values: <span className="font-mono text-[11px]">low</span>, <span className="font-mono text-[11px]">medium</span>, <span className="font-mono text-[11px]">high</span>. Default: <span className="font-mono text-[11px]">high</span>.</p>
                </div>
                <div className="border-b border-white/[0.04] pb-3">
                  <span className="font-mono text-[12px] text-neutral-400">exclusions.paths</span>
                  <p className="text-neutral-600 mt-1">Array of URL paths excluded from RASP inspection.</p>
                </div>
                <div className="border-b border-white/[0.04] pb-3">
                  <span className="font-mono text-[12px] text-neutral-400">scan.timeout</span>
                  <p className="text-neutral-600 mt-1">Maximum seconds per URL scan. Default: <span className="font-mono text-[11px]">30</span>.</p>
                </div>
                <div className="border-b border-white/[0.04] pb-3">
                  <span className="font-mono text-[12px] text-neutral-400">sast.languages</span>
                  <p className="text-neutral-600 mt-1">Comma-separated list of languages to analyze. Default: auto-detect.</p>
                </div>
                <div>
                  <span className="font-mono text-[12px] text-neutral-400">compliance.frameworks</span>
                  <p className="text-neutral-600 mt-1">Array of frameworks to map against. Values: <span className="font-mono text-[11px]">soc2</span>, <span className="font-mono text-[11px]">pci-dss</span>, <span className="font-mono text-[11px]">hipaa</span>, <span className="font-mono text-[11px]">cis</span>.</p>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* System Requirements */}
          <section id="system-requirements" className="mb-20 scroll-mt-24">
            <ScrollReveal>
              <h2 className="text-[15px] font-medium text-white mb-4">System requirements</h2>
              <div className="space-y-4 text-[13px]">
                <div className="grid sm:grid-cols-[120px,1fr] gap-2 border-b border-white/[0.04] pb-3">
                  <span className="text-neutral-500">Windows</span>
                  <span className="text-neutral-600">Windows 10 or later. x64 or ARM64.</span>
                </div>
                <div className="grid sm:grid-cols-[120px,1fr] gap-2 border-b border-white/[0.04] pb-3">
                  <span className="text-neutral-500">macOS</span>
                  <span className="text-neutral-600">macOS 12 Monterey or later. Intel or Apple Silicon.</span>
                </div>
                <div className="grid sm:grid-cols-[120px,1fr] gap-2 border-b border-white/[0.04] pb-3">
                  <span className="text-neutral-500">Linux</span>
                  <span className="text-neutral-600">Ubuntu 20.04+, Fedora 36+, Debian 11+, Arch. x64 or ARM64.</span>
                </div>
                <div className="grid sm:grid-cols-[120px,1fr] gap-2 border-b border-white/[0.04] pb-3">
                  <span className="text-neutral-500">Memory</span>
                  <span className="text-neutral-600">4 GB minimum. 8 GB recommended for large codebases.</span>
                </div>
                <div className="grid sm:grid-cols-[120px,1fr] gap-2">
                  <span className="text-neutral-500">Disk</span>
                  <span className="text-neutral-600">200 MB for the application. Additional space for scan results and reports.</span>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* CTA */}
          <section className="pt-16 border-t border-white/[0.04]">
            <ScrollReveal>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <p className="text-[14px] text-neutral-300">Ready to get started?</p>
                  <p className="text-[12px] text-neutral-600 mt-1">
                    $69.99 one-time. Lifetime license across all platforms.
                  </p>
                </div>
                <Button href="/purchase" size="md">
                  Download <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </ScrollReveal>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
