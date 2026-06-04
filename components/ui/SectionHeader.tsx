import type { ReactNode } from 'react';

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
};

export function SectionHeader({ eyebrow, title, description, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#717171]">{eyebrow}</p>
        <h2 className="text-[28px] font-bold tracking-tight text-[#222222] sm:text-[32px]">{title}</h2>
        <p className="text-base leading-7 text-[#484848]">{description}</p>
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
