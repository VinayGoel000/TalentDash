import { Container } from '@/components/ui/Container';

export default function CompareLoading() {
  return (
    <Container className="py-8">
      <div className="animate-pulse space-y-8">
        <div className="space-y-2">
          <div className="h-3 w-20 rounded-full bg-slate-200" />
          <div className="h-8 w-72 rounded-full bg-slate-200" />
          <div className="h-4 w-full max-w-xl rounded-full bg-slate-200" />
        </div>
        <div className="h-32 rounded-lg bg-slate-200" />
        <div className="min-h-[18rem] rounded-lg bg-slate-200" />
      </div>
    </Container>
  );
}
