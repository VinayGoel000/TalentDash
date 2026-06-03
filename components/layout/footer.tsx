import { Container } from '@/components/ui/container';

export function Footer() {
  return (
    <footer className="border-t border-[#EBEBEB] bg-white">
      <Container className="py-8 text-sm text-[#717171]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>TalentDash</p>
          <p>Salary intelligence platform</p>
        </div>
      </Container>
    </footer>
  );
}
