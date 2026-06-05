import Link from 'next/link';

const TYPES: { value: 'records' | 'companies' | 'roles'; label: string; description: string }[] = [
  { value: 'records', label: 'Records', description: 'Two salary records' },
  { value: 'companies', label: 'Companies', description: 'Two employers' },
  { value: 'roles', label: 'Roles', description: 'Two job functions' },
];

type CompareTypeSwitcherProps = {
  active: 'records' | 'companies' | 'roles';
};

export function CompareTypeSwitcher({ active }: CompareTypeSwitcherProps) {
  return (
    <div className="inline-flex flex-wrap items-center gap-1 rounded-2xl border border-[#EBEBEB] bg-white p-1 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      {TYPES.map((entry) => (
        <Link
          key={entry.value}
          href={`/compare?type=${entry.value}`}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
            entry.value === active
              ? 'bg-[#FF5A5F] text-white shadow-[0_4px_10px_rgba(255,90,95,0.25)]'
              : 'text-[#484848] hover:bg-[#F7F7F7] hover:text-[#222222]'
          }`}
        >
          <span>{entry.label}</span>
          <span
            className={`hidden text-[10px] font-medium sm:inline ${
              entry.value === active ? 'text-white/80' : 'text-[#717171]'
            }`}
          >
            {entry.description}
          </span>
        </Link>
      ))}
    </div>
  );
}
