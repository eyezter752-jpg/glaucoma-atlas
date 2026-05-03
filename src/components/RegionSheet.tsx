import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useSelection } from '@/state/SelectionContext';
import { cn } from '@/lib/cn';
import { matchesFilter, type SpecCategory } from '@/lib/specialization';
import { FilterChips } from './FilterChips';
import { DoctorCard } from './DoctorCard';

export function RegionSheet() {
  const { selected, open, close } = useSelection();
  const [filters, setFilters] = useState<Set<SpecCategory>>(new Set());

  // ESC закрывает Sheet
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  // Блокируем прокрутку body когда Sheet открыт
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Сбрасываем фильтры при смене выбранного места
  useEffect(() => {
    setFilters(new Set());
  }, [selected?.id]);

  const filteredDoctors = useMemo(() => {
    if (!selected) return [];
    return selected.doctors.filter(d => matchesFilter(d.specialization, filters));
  }, [selected, filters]);

  return (
    <AnimatePresence>
      {open && selected && (
        <>
          {/* Бэкдроп */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-40 bg-ink/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Панель */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 250 }}
            className="fixed top-0 right-0 z-50 h-full w-full md:w-[480px] bg-ink-2 border-l border-edge-soft shadow-2xl flex flex-col"
            role="dialog"
            aria-label={`Список врачей: ${selected.city}`}
          >
            {/* Шапка */}
            <header className="px-7 py-7 border-b border-edge-soft flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-bone-3 mb-2">
                  {selected.countryLabel} · {selected.subtitle}
                </p>
                <h2 className="font-display font-light text-4xl text-bone leading-none mb-3 truncate">
                  {selected.city}
                </h2>
                <p className="font-mono text-[10px] text-bone-3 tabular-nums">
                  {selected.coordinates[0].toFixed(4)}°N · {selected.coordinates[1].toFixed(4)}°E
                </p>
              </div>

              <button
                onClick={close}
                className="shrink-0 w-9 h-9 rounded-full border border-edge-mid text-bone-2 hover:text-bone hover:border-bone-3 transition-colors flex items-center justify-center"
                aria-label="Закрыть"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </header>

            {/* Счётчик + фильтры */}
            <div className="px-7 py-4 border-b border-edge-soft space-y-4">
              <div className="flex items-baseline justify-between gap-4">
                <span className={cn(
                  'font-mono text-[10px] uppercase tracking-[0.25em]',
                  selected.variant === 'ru' ? 'text-ru' : 'text-cis'
                )}>
                  {selected.doctorsCount}
                  <span className="text-bone-3 ml-2">врач{decline(selected.doctorsCount)}</span>
                </span>

                {filters.size > 0 && filteredDoctors.length !== selected.doctorsCount && (
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone-3 tabular-nums">
                    показано {filteredDoctors.length} из {selected.doctorsCount}
                  </span>
                )}
              </div>

              <FilterChips
                active={filters}
                onChange={setFilters}
                variant={selected.variant}
              />
            </div>

            {/* Список */}
            <div className="flex-1 overflow-y-auto px-7 py-5">
              {filteredDoctors.length === 0 ? (
                <div className="text-center py-16">
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone-3 mb-5">
                    по выбранным фильтрам никого нет
                  </p>
                  <button
                    type="button"
                    onClick={() => setFilters(new Set())}
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-ru hover:text-bone transition-colors border-b border-ru/40 hover:border-bone pb-0.5"
                  >
                    сбросить фильтры
                  </button>
                </div>
              ) : (
                <ul className="space-y-3">
                  {filteredDoctors.map((d, i) => (
                    <li key={`${d.id}-${i}`}>
                      <DoctorCard doctor={d} selectedCity={selected.city} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function decline(n: number): string {
  const last = n % 10;
  const lastTwo = n % 100;
  if (lastTwo >= 11 && lastTwo <= 14) return 'ей';
  if (last === 1) return '';
  if (last >= 2 && last <= 4) return 'а';
  return 'ей';
}
