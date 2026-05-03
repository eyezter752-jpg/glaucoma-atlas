import { createContext, useContext, useState, type ReactNode } from 'react';
import type { MapLocation } from '@/lib/locationModel';

interface Ctx {
  selected: MapLocation | null;
  open: boolean;
  select: (loc: MapLocation) => void;
  close: () => void;
}

const SelectionCtx = createContext<Ctx | null>(null);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<MapLocation | null>(null);
  const [open, setOpen] = useState(false);

  function select(loc: MapLocation) {
    setSelected(loc);
    setOpen(true);
  }
  function close() {
    setOpen(false);
    // selected не сбрасываем сразу — для плавной анимации закрытия
  }

  return (
    <SelectionCtx.Provider value={{ selected, open, select, close }}>
      {children}
    </SelectionCtx.Provider>
  );
}

export function useSelection() {
  const ctx = useContext(SelectionCtx);
  if (!ctx) throw new Error('useSelection must be used inside SelectionProvider');
  return ctx;
}
