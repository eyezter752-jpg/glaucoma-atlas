import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { MapLocation } from '@/lib/locationModel';

interface Props {
  location: MapLocation | null;
  position: { x: number; y: number } | null;
  maxCount: number;
}

export function MarkerTooltip({ location, position, maxCount }: Props) {
  return createPortal(
    <AnimatePresence>
      {location && position && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
          className="fixed z-50 pointer-events-none"
          style={{
            left: position.x,
            top: position.y - 12,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="bg-ink-2 border border-edge-mid px-4 py-3 min-w-[200px] shadow-xl">
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-bone-3 mb-1">
              {location.countryLabel}
            </div>
            <div className="font-display italic text-lg text-bone leading-tight mb-1">
              {location.city}
            </div>
            <div className="font-mono text-[10px] text-bone-3 mb-3">
              {location.subtitle}
            </div>

            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 h-1 bg-edge-soft overflow-hidden">
                <div
                  className={location.variant === 'ru' ? 'h-full bg-ru' : 'h-full bg-cis'}
                  style={{ width: `${(location.doctorsCount / maxCount) * 100}%` }}
                />
              </div>
              <div className="font-mono text-sm tabular-nums text-bone">
                {location.doctorsCount}
              </div>
            </div>

            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone-3/70">
              врачей · кликните для списка
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
