'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

type TabId = 'salaries' | 'reviews' | 'interviews' | 'forum';

interface TabConfig {
  id: TabId;
  label: string;
  destination: string;
  searchParam: string;
  placeholder: string;
  available: boolean;
}

const TABS: TabConfig[] = [
  {
    id: 'salaries',
    label: 'Salaries',
    destination: '/salaries',
    searchParam: 'search',
    placeholder: 'Search company or role e.g. Google, Software Engineer',
    available: true,
  },
  {
    id: 'reviews',
    label: 'Reviews',
    destination: '/reviews',
    searchParam: 'q',
    placeholder: 'Search company reviews',
    available: false,
  },
  {
    id: 'interviews',
    label: 'Interviews',
    destination: '/interviews',
    searchParam: 'q',
    placeholder: 'Search interview experiences',
    available: false,
  },
  {
    id: 'forum',
    label: 'Forum',
    destination: '/forum',
    searchParam: 'q',
    placeholder: 'Search community discussions',
    available: false,
  },
];

type SearchPanelProps = {
  locations: string[];
};

const EXPERIENCE_OPTIONS = [
  { value: '', label: 'Any experience' },
  { value: '0-2', label: '0 – 2 years' },
  { value: '3-5', label: '3 – 5 years' },
  { value: '6-9', label: '6 – 9 years' },
  { value: '10+', label: '10+ years' },
];

export function SearchPanel({ locations }: SearchPanelProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>('salaries');
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');

  const tab = useMemo(() => TABS.find((entry) => entry.id === activeTab) ?? TABS[0], [activeTab]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    const trimmed = query.trim();
    if (trimmed) params.set(tab.searchParam, trimmed);
    if (location.trim()) params.set('location', location.trim());
    if (experience) params.set('experience', experience);

    const target = params.toString().length > 0 ? `${tab.destination}?${params.toString()}` : tab.destination;
    router.push(target);
  };

  return (
    <div className="rounded-2xl border border-[#EBEBEB] bg-white p-3 shadow-[0_18px_48px_rgba(15,23,42,0.10)] sm:p-4">
      <div
        role="tablist"
        aria-label="Search context"
        className="flex w-full gap-1 overflow-x-auto rounded-xl bg-[#F7F7F7] p-1"
      >
        {TABS.map((entry) => {
          const isActive = entry.id === activeTab;
          return (
            <button
              key={entry.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(entry.id)}
              className={`flex-1 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition ${
                isActive
                  ? 'bg-white text-[#222222] shadow-sm'
                  : 'text-[#717171] hover:text-[#222222]'
              }`}
            >
              {entry.label}
              {!entry.available ? (
                <span className="ml-1.5 align-middle text-[10px] font-medium uppercase tracking-wider text-[#FF5A5F]">
                  Soon
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="mt-3 grid gap-2 lg:grid-cols-[1.4fr,1fr,1fr,auto]">
        <label className="relative block">
          <span className="sr-only">Search</span>
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#717171]"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="9" r="6" />
            <path d="m17 17-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={tab.placeholder}
            className="h-12 w-full rounded-xl border border-[#EBEBEB] bg-white pl-10 pr-3 text-sm text-[#222222] placeholder:text-[#9CA3AF] focus:border-[#FF5A5F] focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20"
          />
        </label>

        <label className="relative block">
          <span className="sr-only">Location</span>
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#717171]"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 18s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
            <circle cx="10" cy="8" r="2.2" />
          </svg>
          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Location e.g. Bengaluru"
            list="search-panel-locations"
            className="h-12 w-full rounded-xl border border-[#EBEBEB] bg-white pl-10 pr-3 text-sm text-[#222222] placeholder:text-[#9CA3AF] focus:border-[#FF5A5F] focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20"
          />
          <datalist id="search-panel-locations">
            {locations.map((entry) => (
              <option key={entry} value={entry} />
            ))}
          </datalist>
        </label>

        <label className="relative block">
          <span className="sr-only">Experience</span>
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#717171]"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="6" width="14" height="11" rx="2" />
            <path d="M7 6V4h6v2" />
          </svg>
          <select
            value={experience}
            onChange={(event) => setExperience(event.target.value)}
            className="h-12 w-full appearance-none rounded-xl border border-[#EBEBEB] bg-white pl-10 pr-9 text-sm text-[#222222] focus:border-[#FF5A5F] focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20"
          >
            {EXPERIENCE_OPTIONS.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-[#717171]"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 5 3 3 3-3" />
          </svg>
        </label>

        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#FF5A5F] px-5 text-sm font-semibold text-white transition hover:bg-[#e14d52] focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/40"
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="9" r="6" />
            <path d="m17 17-3.5-3.5" />
          </svg>
          Search
        </button>
      </form>
    </div>
  );
}
