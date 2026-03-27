'use client';
import React, { useState } from 'react';

export default function BarracadeCommandThreshold() {
  // Puzzle Layer: Terminal-style interface for key input
  const [key, setKey] = useState('');
  const [access, setAccess] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Final key: BRCD-6A09E667-BB67AE85-8CFA5A7C
    if (key.trim().toUpperCase() === 'BRCD-6A09E667-BB67AE85-8CFA5A7C') {
      setAccess(true);
    }
  };
  return (
    <main className="min-h-screen bg-black text-green-400 font-mono px-6 py-16 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="mb-8 text-green-300 text-xl font-bold">Barracade Secure Console</div>
        {!access ? (
          <form onSubmit={handleSubmit}>
            <div>Enter Authorization Key:</div>
            <input
              type="text"
              value={key}
              onChange={e => setKey(e.target.value)}
              className="w-full bg-neutral-900 text-green-400 border border-green-700 px-3 py-2 mt-2 mb-4 font-mono"
              autoFocus
            />
            <button type="submit" className="border border-emerald-500/60 bg-emerald-500/5 text-emerald-400 px-4 py-2 font-bold hover:bg-emerald-500/15 hover:border-emerald-400 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)] transition-all duration-300">Unlock</button>
          </form>
        ) : (
          <div className="mt-8 text-green-300 text-lg font-bold">Access granted. You’ve successfully navigated the Barracade cryptographic challenge.<br /><span className='text-green-500 text-sm'>Contact: security@barracade.com<br />Badge: <img src='/screenshots/command-palette.png' alt='Barracade Badge' className='inline w-8 h-8' /></span></div>
        )}
      </div>
    </main>
  );
}
