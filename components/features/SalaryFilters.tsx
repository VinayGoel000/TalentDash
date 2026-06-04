'use client';

/**
 * Salary Filters Component
 * Provides filtering interface for salary data
 * Client component for interactivity
 */

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';

interface SalaryFiltersProps {
  allCompanies: string[];
  allRoles: string[];
  allLevels: string[];
  allLocations: string[];
  debounceMs?: number;
}

export function SalaryFilters({
  allCompanies,
  allRoles,
  allLevels,
  allLocations,
  debounceMs = 300,
}: SalaryFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchText, setSearchText] = useState(searchParams.get('search') || '');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  // Get current filter values from URL
  const currentCompany = searchParams.get('company') || '';
  const currentRole = searchParams.get('role') || '';
  const currentLevel = searchParams.get('level') || '';
  const currentLocation = searchParams.get('location') || '';

  // Check if any filters are active
  const hasActiveFilters = currentCompany || currentRole || currentLevel || currentLocation || searchText;

  // Handle search with debounce
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchText(value);
      
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }

      const timeout = setTimeout(() => {
        const params = new URLSearchParams(searchParams);
        if (value) {
          params.set('search', value);
          params.set('page', '1'); // Reset to first page
        } else {
          params.delete('search');
        }
        router.push(`?${params.toString()}`);
      }, debounceMs);

      setSearchTimeout(timeout);
    },
    [searchParams, router, debounceMs, searchTimeout]
  );

  // Handle filter changes
  const handleFilterChange = useCallback(
    (filterName: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(filterName, value);
      } else {
        params.delete(filterName);
      }
      params.set('page', '1'); // Reset to first page when filter changes
      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  // Handle multi-select for levels
  const handleLevelChange = useCallback(
    (level: string, isChecked: boolean) => {
      const params = new URLSearchParams(searchParams);
      const currentLevels = params.get('level')?.split(',') || [];
      
      if (isChecked) {
        currentLevels.push(level);
      } else {
        const index = currentLevels.indexOf(level);
        if (index > -1) {
          currentLevels.splice(index, 1);
        }
      }

      if (currentLevels.length > 0) {
        params.set('level', currentLevels.join(','));
      } else {
        params.delete('level');
      }
      params.set('page', '1');
      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  const selectedLevels = useMemo(() => (currentLevel ? currentLevel.split(',') : []), [currentLevel]);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-4">
      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-slate-700">Search Company</label>
        <input
          type="text"
          placeholder="e.g., Google, Amazon..."
          value={searchText}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 sm:text-sm"
        />
        <p className="mt-1 text-xs text-slate-500">Debounced search (300ms)</p>
      </div>

      {/* Company Dropdown */}
      <div>
        <label htmlFor="company-filter" className="block text-sm font-medium text-slate-700">
          Company
        </label>
        <select
          id="company-filter"
          value={currentCompany}
          onChange={(e) => handleFilterChange('company', e.target.value)}
          className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 sm:text-sm"
        >
          <option value="">All Companies</option>
          {allCompanies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>

      {/* Role Dropdown */}
      <div>
        <label htmlFor="role-filter" className="block text-sm font-medium text-slate-700">
          Role
        </label>
        <select
          id="role-filter"
          value={currentRole}
          onChange={(e) => handleFilterChange('role', e.target.value)}
          className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 sm:text-sm"
        >
          <option value="">All Roles</option>
          {allRoles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {/* Level Multi-Select */}
      <div>
        <label className="block text-sm font-medium text-slate-700">Level</label>
        <div className="mt-2 space-y-2">
          {allLevels.map((level) => (
            <div key={level} className="flex items-center">
              <input
                type="checkbox"
                id={`level-${level}`}
                checked={selectedLevels.includes(level)}
                onChange={(e) => handleLevelChange(level, e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-slate-600 focus:ring-slate-500"
              />
              <label htmlFor={`level-${level}`} className="ml-2 block text-sm text-slate-700">
                {level}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Location Dropdown */}
      <div>
        <label htmlFor="location-filter" className="block text-sm font-medium text-slate-700">
          Location
        </label>
        <select
          id="location-filter"
          value={currentLocation}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 sm:text-sm"
        >
          <option value="">All Locations</option>
          {allLocations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Link
          href="/salaries"
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none w-full"
        >
          Clear all filters
        </Link>
      )}
    </div>
  );
}
