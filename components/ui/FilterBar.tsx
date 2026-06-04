type FilterBarProps = {
  company?: string;
  role?: string;
  location?: string;
  level?: string;
};

export function FilterBar({ company, role, location, level }: FilterBarProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      <input defaultValue={company} name="company" placeholder="Company" className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-600" />
      <input defaultValue={role} name="role" placeholder="Role" className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-600" />
      <input defaultValue={location} name="location" placeholder="Location" className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-600" />
      <input defaultValue={level} name="level" placeholder="Level" className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-600" />
    </div>
  );
}
