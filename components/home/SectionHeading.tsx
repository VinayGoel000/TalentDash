import type { ReactNode } from 'react';
import Link from 'next/link';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  align?: 'left' | 'center';
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
  children,
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <div
      className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${
        align === 'center' ? 'sm:flex-col sm:items-center sm:text-center' : ''
      }`}
    >
      <div className={`flex max-w-2xl flex-col gap-2 ${alignment}`}>
        {eyebrow ? (
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FF5A5F]">
            {eyebrow}
          </span>
        ) : null}
        <h2 className="text-2xl font-bold tracking-tight text-[#222222] sm:text-3xl">{title}</h2>
        {description ? (
          <p className="text-sm leading-6 text-[#484848] sm:text-base">{description}</p>
        ) : null}
        {children}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="inline-flex items-center gap-1 self-start text-sm font-semibold text-[#FF5A5F] hover:text-[#e14d52] sm:self-end"
        >
          {action.label}
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 8h10" />
            <path d="M9 4l4 4-4 4" />
          </svg>
        </Link>
      ) : null}
    </div>
  );
}
