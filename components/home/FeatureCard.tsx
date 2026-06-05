import type { ReactNode } from 'react';
import Link from 'next/link';

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
  meta?: string;
  accent?: 'red' | 'blue' | 'green' | 'amber' | 'violet' | 'slate';
};

const ACCENT_BG: Record<NonNullable<FeatureCardProps['accent']>, string> = {
  red: 'bg-[#FFEFEF] text-[#FF5A5F]',
  blue: 'bg-[#EEF4FF] text-[#2563EB]',
  green: 'bg-[#E8F8EC] text-[#008A05]',
  amber: 'bg-[#FFF5DC] text-[#B26B00]',
  violet: 'bg-[#F0EBFE] text-[#6D3FD8]',
  slate: 'bg-[#F2F2F2] text-[#484848]',
};

export function FeatureCard({
  icon,
  title,
  description,
  href,
  meta,
  accent = 'red',
}: FeatureCardProps) {
  const body = (
    <div className="group flex h-full flex-col gap-4 rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#FF5A5F]/40 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] sm:p-6">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${ACCENT_BG[accent]}`}
        aria-hidden="true"
      >
        {icon}
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-base font-semibold text-[#222222] sm:text-lg">{title}</h3>
        <p className="text-sm leading-6 text-[#717171]">{description}</p>
      </div>
      {meta ? (
        <div className="mt-auto flex items-center justify-between border-t border-[#F2F2F2] pt-3 text-xs font-medium text-[#717171]">
          <span>{meta}</span>
          {href ? (
            <span className="inline-flex items-center gap-1 text-[#FF5A5F]">
              Explore
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h10" />
                <path d="M9 4l4 4-4 4" />
              </svg>
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {body}
      </Link>
    );
  }

  return body;
}
