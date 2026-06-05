'use client';

import { useMemo, useState } from 'react';
import { CAREER_PATHS, type CareerPath } from '@/lib/preview-data';
import { formatCompensation } from '@/lib/formatters';

const ACCENT_BG: Record<CareerPath['icon'], string> = {
  engineering: 'bg-[#FFEFEF] text-[#FF5A5F]',
  product: 'bg-[#EEF4FF] text-[#2563EB]',
  data: 'bg-[#E8F8EC] text-[#008A05]',
  design: 'bg-[#F0EBFE] text-[#6D3FD8]',
};

export function CareerPathExplorer() {
  const [pathId, setPathId] = useState(CAREER_PATHS[0].id);
  const path = useMemo(
    () => CAREER_PATHS.find((entry) => entry.id === pathId) ?? CAREER_PATHS[0],
    [pathId]
  );
  const [selectedNodeId, setSelectedNodeId] = useState(path.nodes[0].id);
  const selected = useMemo(
    () => path.nodes.find((node) => node.id === selectedNodeId) ?? path.nodes[0],
    [path, selectedNodeId]
  );

  const accent = ACCENT_BG[path.icon];

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6 lg:col-span-4">
        <h2 className="text-base font-semibold text-[#222222] sm:text-lg">Path</h2>
        <div className="mt-3 space-y-2">
          {CAREER_PATHS.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => {
                setPathId(entry.id);
                setSelectedNodeId(entry.nodes[0].id);
              }}
              className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left transition ${
                entry.id === pathId
                  ? 'border-[#FF5A5F]/40 bg-[#FFF7F4]'
                  : 'border-[#EBEBEB] bg-white hover:border-[#FF5A5F]/30'
              }`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${ACCENT_BG[entry.icon]}`}
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M3 17l5-6 4 4 7-9" />
                  <path d="M14 6h5v5" />
                </svg>
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm font-semibold text-[#222222]">{entry.role}</span>
                <span className="truncate text-xs text-[#717171]">{entry.description}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 lg:col-span-8">
        <div className={`rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6`}>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M3 17l5-6 4 4 7-9" />
                <path d="M14 6h5v5" />
              </svg>
            </span>
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-[#222222] sm:text-lg">
                {path.role}
              </h3>
              <p className="text-xs text-[#717171]">{path.description}</p>
            </div>
          </div>

          <ol className="mt-5 space-y-3">
            {path.nodes.map((node, index) => {
              const isSelected = node.id === selected.id;
              const widthPct = Math.min(
                100,
                Math.round(
                  (node.medianTotalCompensation /
                    Math.max(
                      1,
                      path.nodes[path.nodes.length - 1].medianTotalCompensation
                    )) *
                    100
                )
              );
              return (
                <li key={node.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`block w-full rounded-xl border px-4 py-3 text-left transition ${
                      isSelected
                        ? 'border-[#FF5A5F]/50 bg-[#FFF7F4]'
                        : 'border-[#EBEBEB] bg-white hover:border-[#FF5A5F]/30'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                            isSelected
                              ? 'bg-[#FF5A5F] text-white'
                              : 'bg-[#F2F2F2] text-[#484848]'
                          }`}
                        >
                          {index + 1}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-[#222222]">
                            {node.level}
                          </span>
                          <span className="text-xs text-[#717171]">{node.yearsExperience}</span>
                        </div>
                      </div>
                      <span className="text-sm font-semibold tabular-nums text-[#222222]">
                        {formatCompensation(node.medianTotalCompensation, 'INR')}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#F2F2F2]">
                      <div
                        className="h-full rounded-full bg-[#FF5A5F]"
                        style={{ width: `${Math.max(8, widthPct)}%` }}
                      />
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-[#222222] sm:text-lg">
                {selected.level}
              </h3>
              <p className="text-xs text-[#717171]">
                {selected.yearsExperience} · Median TC {formatCompensation(selected.medianTotalCompensation, 'INR')}
              </p>
            </div>
            <span className="rounded-full bg-[#FFF7F4] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#FF5A5F]">
              {selected.nextMoveProbability}% make the next move
            </span>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[#F2F2F2] bg-[#FAFAFA] p-4">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#FF5A5F]">
                Responsibilities
              </div>
              <ul className="mt-2 space-y-1.5 text-sm text-[#222222]">
                {selected.responsibilities.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5A5F]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-[#F2F2F2] bg-[#FAFAFA] p-4">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#2563EB]">
                Skills to invest in
              </div>
              <ul className="mt-2 space-y-1.5 text-sm text-[#222222]">
                {selected.skills.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
