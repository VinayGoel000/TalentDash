import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/Button';

const navLinks = [
  { href: '/companies', label: 'Companies' },
  { href: '/salaries', label: 'Salaries' },
  { href: '/compare', label: 'Compare' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white">TD</span>
          <span className="text-sm font-semibold tracking-tight text-slate-900">TalentDash</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
              {link.label}
            </Link>
          ))}
        </nav>

        <Button href="/salaries" className="px-4">
          Submit Salary
        </Button>
      </Container>
    </header>
  );
}
