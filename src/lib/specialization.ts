import type { Specialization } from '@/data/types';

export type SpecCategory = 'diagnostics' | 'surgery';

export const SPEC_META: Record<SpecCategory, { label: string; short: string }> = {
  diagnostics: { label: 'Диагностика', short: 'Дх' },
  surgery: { label: 'Хирургия', short: 'Хр' },
};

export function getSpecBadges(spec: Specialization): SpecCategory[] {
  const out: SpecCategory[] = [];
  if (spec.diagnostics) out.push('diagnostics');
  if (spec.surgery) out.push('surgery');
  return out;
}

export function getSpecLabel(spec: Specialization): string {
  if (spec.diagnostics && spec.surgery) return 'Диагностика и хирургия';
  if (spec.diagnostics) return 'Диагностика';
  if (spec.surgery) return 'Хирургия';
  return spec.raw;
}

export function matchesFilter(spec: Specialization, active: Set<SpecCategory>): boolean {
  if (active.size === 0) return true;
  for (const cat of active) {
    if (spec[cat]) return true;
  }
  return false;
}
