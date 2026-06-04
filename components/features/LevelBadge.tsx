/**
 * Level Badge Component
 * Displays job level with appropriate color coding
 */

interface LevelBadgeProps {
  level: string;
}

export function LevelBadge({ level }: LevelBadgeProps) {
  // Determine style based on level
  const getStyle = (lvl: string) => {
    switch (lvl) {
      case 'L3':
        // Slate
        return 'border-slate-200 bg-slate-50 text-slate-700';
      case 'L4':
        // Blue
        return 'border-blue-200 bg-blue-50 text-blue-700';
      case 'L5':
        // Indigo
        return 'border-indigo-200 bg-indigo-50 text-indigo-700';
      case 'L6':
        // Purple
        return 'border-purple-200 bg-purple-50 text-purple-700';
      case 'PRINCIPAL':
        // Navy
        return 'border-slate-400 bg-slate-900 text-white';
      default:
        return 'border-slate-200 bg-slate-50 text-slate-600';
    }
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${getStyle(level)}`.trim()}>
      {level}
    </span>
  );
}
