import { Container } from '@/components/ui/container';

function SkeletonRow() {
  return (
    <tr className="animate-pulse border-b border-slate-200">
      <td className="px-6 py-4"><div className="h-4 w-32 rounded-full bg-slate-200" /></td>
      <td className="px-6 py-4"><div className="h-4 w-40 rounded-full bg-slate-200" /></td>
      <td className="px-6 py-4"><div className="h-4 w-24 rounded-full bg-slate-200" /></td>
      <td className="px-6 py-4"><div className="h-4 w-16 rounded-full bg-slate-200" /></td>
      <td className="px-6 py-4"><div className="h-4 w-20 rounded-full bg-slate-200" /></td>
      <td className="px-6 py-4"><div className="ml-auto h-4 w-24 rounded-full bg-slate-200" /></td>
      <td className="px-6 py-4"><div className="ml-auto h-4 w-28 rounded-full bg-slate-200" /></td>
      <td className="px-6 py-4"><div className="ml-auto h-4 w-16 rounded-full bg-slate-200" /></td>
    </tr>
  );
}

export default function Loading() {
  return (
    <Container className="py-8">
      <div className="mb-6 space-y-3">
        <div className="h-8 w-72 rounded-full bg-slate-200" />
        <div className="h-5 w-full max-w-2xl rounded-full bg-slate-200" />
      </div>

      <div className="mb-6 h-48 rounded-lg bg-slate-200" />

      <div className="mb-4 h-4 w-40 rounded-full bg-slate-200" />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {Array.from({ length: 8 }).map((_, index) => (
                <th key={index} className="px-6 py-4">
                  <div className="h-3 w-20 rounded-full bg-slate-200" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, index) => (
              <SkeletonRow key={index} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 h-12 rounded-lg bg-slate-200" />
    </Container>
  );
}
