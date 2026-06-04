import Link from 'next/link';

export function CurrencyToggle({ current, hrefBase }: { current: 'INR' | 'USD'; hrefBase: string }) {
  return (
    <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1">
      {(['INR', 'USD'] as const).map((currency) => (
        <Link
          key={currency}
          href={`${hrefBase}${currency === current ? '' : `?currency=${currency}`}`}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium ${currency === current ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
        >
          {currency}
        </Link>
      ))}
    </div>
  );
}
