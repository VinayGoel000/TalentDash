import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

const base =
  'inline-flex h-11 w-fit items-center justify-center rounded-xl px-5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/30';

export function Button({ children, href, variant = 'primary', className = '', ...props }: ButtonProps) {
  const styles =
    variant === 'primary'
      ? 'bg-[#FF5A5F] text-white hover:bg-[#e14d52]'
      : 'border border-[#EBEBEB] bg-white text-[#222222] hover:bg-[#F2F2F2]';

  if (href) {
    return (
      <Link href={href} className={`${base} ${styles} ${className}`.trim()}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={`${base} ${styles} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
