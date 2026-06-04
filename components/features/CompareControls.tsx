'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { CompareSelectors } from '@/components/features/CompareSelectors';
import type { CompareRecordOption } from '@/lib/compare-options';
import type { SalaryRecord } from '@/types/salary';

interface CompareControlsProps {
  recordOptions: CompareRecordOption[];
  recordA: SalaryRecord | null;
  recordB: SalaryRecord | null;
}

export function CompareControls({ recordOptions, recordA, recordB }: CompareControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = useCallback(
    (key: 's1' | 's2', id: string) => {
      const params = new URLSearchParams(searchParams);
      if (id) {
        params.set(key, id);
      } else {
        params.delete(key);
      }
      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  return (
    <CompareSelectors
      recordOptions={recordOptions}
      recordA={recordA}
      recordB={recordB}
      onRecordAChange={(id) => updateParam('s1', id)}
      onRecordBChange={(id) => updateParam('s2', id)}
    />
  );
}
