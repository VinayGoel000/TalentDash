'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type NavLink = {
  href: string;
  label: string;
  description?: string;
};

type NavbarMenuProps = {
  label: string;
  links: NavLink[];
};

export function NavbarMenu({ label, links }: NavbarMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="true"
        className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-[#484848] transition hover:bg-[#F7F7F7] hover:text-[#222222]"
      >
        {label}
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m4 6 4 4 4-4" />
        </svg>
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-72 rounded-2xl border border-[#EBEBEB] bg-white p-2 shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
        >
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="flex items-start gap-3 rounded-xl px-3 py-2 transition hover:bg-[#FFF7F4]"
                >
                  <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5A5F]" />
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="text-sm font-semibold text-[#222222]">{link.label}</span>
                    {link.description ? (
                      <span className="truncate text-xs text-[#717171]">
                        {link.description}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
