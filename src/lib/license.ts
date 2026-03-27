import { randomBytes } from 'crypto';

export function generateLicenseKey(): string {
  const bytes = randomBytes(16);
  const hex = bytes.toString('hex').toUpperCase();
  return `BRCD-${hex.slice(0, 4)}-${hex.slice(4, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}`;
}
