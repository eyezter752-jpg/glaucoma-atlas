import { cn } from '@/lib/cn';
import type { SpecCategory } from '@/lib/specialization';
import { SPEC_META } from '@/lib/specialization';

interface Props {
  category: SpecCategory;
  size?: 'sm' | 'md';
}

export function SpecBadge({ category, size = 'md' }: Props) {
  const label = SPEC_META[category].label;
  const isFilled = category === 'surgery';
  return (
    <span
      className={cn(
        'inline-flex items-center font-mono uppercase tracking-[0.18em] border',
        size === 'md' ? 'text-[10px] px-2.5 py-1' : 'text-[9px] px-2 py-0.5',
        isFilled
          ? 'bg-bone-2 text-ink border-bone-2'
          : 'bg-transparent text-bone-2 border-edge-mid'
      )}
    >
      {label}
    </span>
  );
}
