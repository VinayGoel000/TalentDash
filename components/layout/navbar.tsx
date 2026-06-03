import Link from 'next/link';
import { Container } from '@/components/ui/container';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/salaries', label: 'Salaries' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#EBEBEB] bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-[#222222]">
          TalentDash
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-[#484848] transition hover:bg-[#F2F2F2] hover:text-[#222222]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
