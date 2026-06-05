import type { ReactNode } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';

export type PreviewPageHeroAction = {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
};

type PreviewPageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  badges?: string[];
  actions?: PreviewPageHeroAction[];
  meta?: ReactNode;
};

export function PreviewPageHero({
  eyebrow,
  title,
  description,
  badges = [],
  actions = [],
  meta,
}: PreviewPageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[#EBEBEB] bg-[#FFF7F4]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at top right, rgba(255,90,95,0.16), transparent 55%), radial-gradient(circle at bottom left, rgba(255,180,0,0.08), transparent 50%)',
        }}
      />
      <Container className="relative py-12 sm:py-16 lg:py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FFD1D3] bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#FF5A5F] shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF5A5F]" />
            {eyebrow}
          </span>
          <h1 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-[#222222] sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#484848] sm:text-lg">
            {description}
          </p>

          {badges.length > 0 ? (
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center rounded-full border border-[#EBEBEB] bg-white px-3 py-1 text-xs font-medium text-[#484848]"
                >
                  {badge}
                </span>
              ))}
            </div>
          ) : null}

          {actions.length > 0 ? (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {actions.map((action) => (
                <Link
                  key={action.href + action.label}
                  href={action.href}
                  className={
                    action.variant === 'secondary'
                      ? 'inline-flex h-11 items-center justify-center rounded-xl border border-[#EBEBEB] bg-white px-5 text-sm font-semibold text-[#222222] transition hover:bg-[#F2F2F2]'
                      : 'inline-flex h-11 items-center justify-center rounded-xl bg-[#FF5A5F] px-5 text-sm font-semibold text-white transition hover:bg-[#e14d52] focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/40'
                  }
                >
                  {action.label}
                </Link>
              ))}
            </div>
          ) : null}

          {meta ? <div className="mt-6 text-xs font-medium text-[#717171]">{meta}</div> : null}
        </div>
      </Container>
    </section>
  );
}
