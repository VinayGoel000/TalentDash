import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { formatCompensation, formatPercentage } from '@/lib/formatters';

export type SalaryTableRow = {
  id: string;
  role: string;
  level: string;
  location: string;
  currency: string;
  experience_years: number;
  base_salary: string;
  stock: string;
  total_compensation: string;
  confidence_score: string;
  is_verified: boolean;
  company: { name: string; slug: string };
};

export function SalaryTable({ rows }: { rows: SalaryTableRow[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50">
            <tr className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Level</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Experience</th>
              <th className="px-4 py-3 text-right">Base Salary</th>
              <th className="px-4 py-3 text-right">Stock</th>
              <th className="px-4 py-3 text-right">Total Compensation</th>
              <th className="px-4 py-3 text-right">Confidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-slate-900">
                  <Link href={`/companies/${row.company.slug}`} className="hover:underline">
                    {row.company.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{row.role}</td>
                <td className="px-4 py-3">
                  <Badge tone={row.level === 'PRINCIPAL' ? 'blue' : row.level === 'L6' ? 'green' : row.level === 'L5' ? 'amber' : 'neutral'}>
                    {row.level}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{row.location}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{row.experience_years}y</td>
                <td className="px-4 py-3 text-right text-sm font-medium tabular-nums text-slate-900">{formatCompensation(row.base_salary, row.currency)}</td>
                <td className="px-4 py-3 text-right text-sm font-medium tabular-nums text-slate-900">{formatCompensation(row.stock, row.currency)}</td>
                <td className="px-4 py-3 text-right text-sm font-semibold tabular-nums text-slate-900">{formatCompensation(row.total_compensation, row.currency)}</td>
                <td className="px-4 py-3 text-right text-sm text-slate-600">{formatPercentage(row.confidence_score)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
