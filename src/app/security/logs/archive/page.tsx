import React from 'react';
import { GlitchText } from '@/components/glitch-text';

export default function SecurityLogsArchive() {
  // Puzzle Layer: Embedded cryptographic clues in log entries
  return (
    <main className="min-h-screen bg-black text-green-400 font-mono px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <GlitchText as="h2" className="text-2xl mb-8 text-green-300">
          Barracade Security Logs Archive
        </GlitchText>
        <div className="space-y-4 text-sm">
          {/* Irregular timestamps, hex, ASCII, binary, hash clues */}
          <div>2026-03-12 03:14:15 | 0x42 0x52 0x43 0x44 | Event: System initialized</div>
          <div>2026-03-12 03:15:09 | 5365637572697479206973206e6f742061206665617475726521 | Event: Hex anomaly detected</div>
          <div>2026-03-12 03:16:22 | 01000010 01010010 01000011 01000100 | Event: Binary pattern observed</div>
          <div>2026-03-12 03:17:01 | Uif!cbssjfs!qspufdut | Event: Caesar shift anomaly</div>
          <div>2026-03-12 03:18:44 | QlJDRC1CNjQtUjBPVEtJVA== | Event: Base64 encoded rootkit</div>
          <div>2026-03-12 03:19:27 | 2e 2e 2f 73 65 63 72 65 74 | Event: Path traversal attempt</div>
          <div>2026-03-12 03:20:11 | &#x25;42&#x25;52&#x25;43&#x25;44 | Event: URL encoded sequence</div>
          <div>2026-03-12 03:21:59 | 5d41402abc4b2a76b9719d911017c592 | Event: MD5 hash reference</div>
          <div>2026-03-12 03:22:33 | 2026-03-12 03:22:33 | Event: Timestamp loop anomaly</div>
          <div>2026-03-12 03:23:47 | 0x4e65787420436c7565 | Event: Hex: Next Clue</div>
          <div>2026-03-12 03:24:18 | 0x2f6261727261636164652f636f6d6d616e642f7468726573686f6c64 | Event: Path: /barracade/command/threshold</div>
        </div>
        <div className="mt-12 text-green-500 text-xs opacity-70">
          {/* Subtle hint for the next step */}
          Analyze log patterns, decode anomalies, and follow the path.
        </div>
      </div>
    </main>
  );
}
