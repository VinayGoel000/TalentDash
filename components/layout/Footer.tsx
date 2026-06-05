import Link from 'next/link';
import { Container } from '@/components/ui/container';

const FOOTER_COLUMNS = [
  {
    title: 'Explore',
    links: [
      { href: '/companies', label: 'Companies' },
      { href: '/salaries', label: 'Salaries' },
      { href: '/reviews', label: 'Reviews' },
      { href: '/interviews', label: 'Interviews' },
      { href: '/jobs', label: 'Jobs' },
    ],
  },
  {
    title: 'Community',
    links: [
      { href: '/forum', label: 'Forum' },
      { href: '/offers', label: 'Offers' },
      { href: '/tools', label: 'Tools' },
      { href: '/brands', label: 'Brands' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/blog', label: 'Blog' },
      { href: '/careers', label: 'Careers' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
      { href: '/data-policy', label: 'Data policy' },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#EBEBEB] bg-white">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_3fr]">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2" aria-label="TalentDash home">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF5A5F] text-sm font-bold text-white">
                TD
              </span>
              <span className="text-base font-bold tracking-tight text-[#222222]">TalentDash</span>
            </Link>
            <p className="max-w-sm text-sm leading-6 text-[#717171]">
              Career intelligence for engineers, operators and recruiters — built on verified
              compensation, review, interview and offer data.
            </p>
            <div className="flex items-center gap-2">
              <Link
                href="/signup"
                className="inline-flex h-10 items-center justify-center rounded-xl bg-[#FF5A5F] px-4 text-sm font-semibold text-white transition hover:bg-[#e14d52]"
              >
                Get started
              </Link>
              <Link
                href="/salaries"
                className="inline-flex h-10 items-center justify-center rounded-xl border border-[#EBEBEB] bg-white px-4 text-sm font-semibold text-[#222222] transition hover:bg-[#F2F2F2]"
              >
                Browse salaries
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#222222]">
                  {column.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[#484848] transition hover:text-[#FF5A5F]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-[#EBEBEB] pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-[#717171]">
            © {year} TalentDash. All rights reserved.
          </p>
          <p className="text-xs text-[#717171]">
            Built with Next.js, Prisma and Neon PostgreSQL.
          </p>
        </div>
      </Container>
    </footer>
  );
}
