'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type NavLink = { href: string; label: string };

type MobileNavProps = {
  links: NavLink[];
};

export function MobileNav({ links }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#EBEBEB] bg-white text-[#222222] transition hover:bg-[#F2F2F2] lg:hidden"
      >
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-[#222222]/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-nav-panel"
            className="absolute right-0 top-0 flex h-full w-80 max-w-[88%] flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#EBEBEB] px-5 py-4">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF5A5F] text-xs font-bold text-white">
                  TD
                </span>
                <span className="text-sm font-semibold text-[#222222]">TalentDash</span>
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#717171] hover:bg-[#F2F2F2] hover:text-[#222222]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-2 py-3">
              <ul className="space-y-1">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#222222] hover:bg-[#F2F2F2]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-[#EBEBEB] p-4">
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center rounded-xl border border-[#EBEBEB] bg-white px-3 py-2.5 text-sm font-semibold text-[#222222] hover:bg-[#F2F2F2]"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center rounded-xl bg-[#FF5A5F] px-3 py-2.5 text-sm font-semibold text-white hover:bg-[#e14d52]"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
