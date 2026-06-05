import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { MobileNav } from '@/components/layout/MobileNav';

const NAV_LINKS = [
  { href: '/companies', label: 'Companies' },
  { href: '/salaries', label: 'Salaries' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/interviews', label: 'Interviews' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/forum', label: 'Forum' },
  { href: '/offers', label: 'Offers' },
  { href: '/tools', label: 'Tools' },
  { href: '/brands', label: 'Brands' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#EBEBEB] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Link href="/" className="flex items-center gap-2" aria-label="TalentDash home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF5A5F] text-sm font-bold text-white shadow-[0_4px_10px_rgba(255,90,95,0.35)]">
            TD
          </span>
          <span className="text-base font-bold tracking-tight text-[#222222]">TalentDash</span>
        </Link>

        <nav aria-label="Primary" className="hidden flex-1 justify-center lg:flex">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-[#484848] transition hover:bg-[#F7F7F7] hover:text-[#222222]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/login"
            className="inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold text-[#222222] transition hover:bg-[#F7F7F7]"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-[#FF5A5F] px-4 text-sm font-semibold text-white transition hover:bg-[#e14d52] focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/40"
          >
            Sign up
          </Link>
        </div>

        <MobileNav links={NAV_LINKS} />
      </Container>
    </header>
  );
}
