import Link from 'next/link';
import Image from 'next/image';
import { CipherText } from '@/components/cipher-text';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.04] bg-[#050505]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-10 pb-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center">
            <Image src="/no-backround-logo.png" alt="Barracade" width={90} height={20} />
          </div>
          <div className="flex gap-6">
            <Link href="/features" className="text-[12px] text-neutral-600 hover:text-neutral-400 transition-colors">Features</Link>
            <Link href="/docs" className="text-[12px] text-neutral-600 hover:text-neutral-400 transition-colors">Docs</Link>
            <Link href="/purchase" className="text-[12px] text-neutral-600 hover:text-neutral-400 transition-colors">Download</Link>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-[11px] text-neutral-700">&copy; {new Date().getFullYear()} Barracade</p>
            <div className="opacity-0 hover:opacity-40 transition-opacity duration-[2000ms]">
              <CipherText
                encrypted=".---- ..--- ...-- / - .... .-. . ... .... --- .-.. -.."
                decrypted="COMMAND THE THRESHOLD"
                hint="The path is hidden but the destination is not"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-white/[0.03] flex gap-5">
          <Link href="/privacy" className="text-[11px] text-neutral-700 hover:text-neutral-500 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="text-[11px] text-neutral-700 hover:text-neutral-500 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
