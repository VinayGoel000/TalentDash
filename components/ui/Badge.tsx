export function Badge({ children, tone = 'neutral' }: { children: string; tone?: 'neutral' | 'blue' | 'green' | 'amber' }) {
  const styles =
    tone === 'blue'
      ? 'border-blue-200 bg-blue-50 text-blue-700'
      : tone === 'green'
        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
        : tone === 'amber'
          ? 'border-amber-200 bg-amber-50 text-amber-700'
          : 'border-slate-200 bg-slate-50 text-slate-600';
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${styles}`.trim()}>{children}</span>;
}
