import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/cn';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-edge-soft bg-ink/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-baseline gap-2 group">
          <span className="font-display italic text-xl font-light text-bone tracking-tight">Atlas</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-3 group-hover:text-bone-2 transition-colors">
            глаукоматологи
          </span>
        </NavLink>

        <nav className="flex items-center gap-8">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              cn(
                'font-mono text-[11px] uppercase tracking-[0.2em] transition-colors',
                isActive ? 'text-bone' : 'text-bone-3 hover:text-bone-2'
              )
            }
          >
            Карта
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              cn(
                'font-mono text-[11px] uppercase tracking-[0.2em] transition-colors',
                isActive ? 'text-bone' : 'text-bone-3 hover:text-bone-2'
              )
            }
          >
            О проекте
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
