import { Container } from '@/components/ui/container';

export default function CompanyLoading() {
  return (
    <Container className="py-8">
      <div className="animate-pulse space-y-8">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-slate-200" />
          <div className="space-y-2">
            <div className="h-3 w-32 rounded-full bg-slate-200" />
            <div className="h-8 w-56 rounded-full bg-slate-200" />
            <div className="h-4 w-40 rounded-full bg-slate-200" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-24 rounded-xl bg-slate-200" />
          <div className="h-24 rounded-xl bg-slate-200" />
          <div className="h-24 rounded-xl bg-slate-200" />
        </div>

        <div className="h-48 rounded-xl bg-slate-200" />
        <div className="h-80 rounded-xl bg-slate-200" />
      </div>
    </Container>
  );
}
