export function SearchBar({ defaultValue, name = 'search' }: { defaultValue?: string; name?: string }) {
  return (
    <input
      name={name}
      defaultValue={defaultValue}
      placeholder="Search companies, roles, or locations"
      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-600"
    />
  );
}
