import { Marker } from 'react-simple-maps';
import { getMarkerRadius, shouldShowLabel } from '@/lib/markerSize';
import { motion } from 'framer-motion';

interface Props {
  coordinates: [number, number]; // [lon, lat] — уже перевёрнуто для Marker
  count: number;
  label: string;
  variant: 'ru' | 'cis';
  index: number;
  onHover: (e: React.MouseEvent) => void;
  onLeave: () => void;
  onClick: () => void;
}

export function CityMarker({
  coordinates, count, label, variant, index, onHover, onLeave, onClick,
}: Props) {
  const r = getMarkerRadius(count);
  const color = variant === 'ru' ? '#14B8A6' : '#F59E0B';
  const labelOffsetX = r + 6;
  const showLabel = shouldShowLabel(count);

  return (
    <Marker coordinates={coordinates}>
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 + index * 0.025, duration: 0.4, ease: 'backOut' }}
        whileHover={{ scale: 1.15 }}
        style={{ cursor: 'pointer', transformOrigin: 'center', transformBox: 'fill-box' }}
        onMouseEnter={onHover}
        onMouseMove={onHover}
        onMouseLeave={onLeave}
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label={`${label}, ${count} врачей, открыть список`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
      >
        {/* Пульсирующий ореол */}
        <circle
          r={r}
          fill={color}
          opacity={0.25}
          style={{
            transformOrigin: 'center',
            transformBox: 'fill-box',
            animation: 'marker-pulse 2.4s ease-out infinite',
            animationDelay: `${index * 0.15}s`,
            pointerEvents: 'none',
          }}
        />

        {/* Основная точка */}
        <circle r={r} fill={color} stroke="#0A0E1A" strokeWidth={1.5} />

        {/* Подпись для крупных городов */}
        {showLabel && (
          <text
            x={labelOffsetX}
            y={3}
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 9,
              fontWeight: 500,
              fill: '#94A3B8',
              letterSpacing: '0.08em',
              pointerEvents: 'none',
              textTransform: 'uppercase',
              textShadow: '0 0 3px #0A0E1A, 0 0 3px #0A0E1A, 0 0 3px #0A0E1A',
            }}
          >
            {label} · {count}
          </text>
        )}
      </motion.g>
    </Marker>
  );
}
