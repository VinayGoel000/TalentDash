import Image from 'next/image';

const LOGO_SIZE = 48;

type CompanyLogoProps = {
  name: string;
  size?: number;
};

export function CompanyLogo({ name, size = LOGO_SIZE }: CompanyLogoProps) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
      style={{ width: size, height: size }}
    >
      <Image
        src="/logos/default.svg"
        alt={`${name} logo`}
        width={size}
        height={size}
        sizes={`${size}px`}
        className="object-contain p-2"
      />
    </div>
  );
}
