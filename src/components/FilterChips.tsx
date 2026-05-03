import { cn } from '@/lib/cn';
import type { SpecCategory } from '@/lib/specialization';

interface Props {
  active: Set<SpecCategory>;
  onChange: (next: Set<SpecCategory>) => void;
  variant: 'ru' | 'cis';
}

const ALL_CATS: { key: SpecCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'Все' },
  { key: 'diagnostics', label: 'Диагностика' },
  { key: 'surgery', label: 'Хирургия' },
];

export function FilterChips({ active, onChange, variant }: Props) {
  const isAllActive = active.size === 0;
  const accentClass = variant === 'ru' ? 'bg-ru text-ink border-ru' : 'bg-cis text-ink border-cis';

  function toggle(cat: SpecCategory | 'all') {
    if (cat === 'all') {
      onChange(new Set());
      return;
    }
    const next = new Set(active);
    if (next.has(cat)) next.delete(cat);
    else next.add(cat);
    onChange(next);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {ALL_CATS.map(({ key, label }) => {
        const isActive = key === 'all' ? isAllActive : active.has(key as SpecCategory);
        return (
          <button
            key={key}
            type="button"
            onClick={() => toggle(key)}
            className={cn(
              'font-mono text-[10px] uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full border transition-colors',
              isActive
                ? key === 'all'
                  ? accentClass
                  : 'bg-bone text-ink border-bone'
                : 'bg-transparent text-bone-3 border-edge-soft hover:border-edge-mid hover:text-bone-2'
            )}
            aria-pressed={isActive}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
