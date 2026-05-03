import { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';
import { motion } from 'framer-motion';
import { useGeo } from '@/hooks/useGeo';
import { ISO_CODES } from '@/data/countries-iso';
import { russiaCities, cisCountries } from '@/data';
import { CityMarker } from './CityMarker';
import { MarkerTooltip } from './MarkerTooltip';
import { useSelection } from '@/state/SelectionContext';
import { fromRussiaCity, fromCISCity, type MapLocation } from '@/lib/locationModel';

const PROJECTION_CONFIG = {
  rotate: [-90, 0, 0] as [number, number, number],
  scale: 280,
  center: [0, 60] as [number, number],
};

const COUNTRY_LABELS: Record<string, string> = {
  [ISO_CODES.RU]: 'Россия',
  [ISO_CODES.KZ]: 'Казахстан',
  [ISO_CODES.UZ]: 'Узбекистан',
  [ISO_CODES.BY]: 'Беларусь',
  [ISO_CODES.TJ]: 'Таджикистан',
};

const MANUAL_CENTROIDS: Partial<Record<string, [number, number]>> = {
  [ISO_CODES.RU]: [95, 62],
};

const LABEL_FONT_SIZE: Partial<Record<string, number>> = {
  [ISO_CODES.RU]: 22,
  [ISO_CODES.KZ]: 11,
  [ISO_CODES.UZ]: 10,
  [ISO_CODES.BY]: 9,
  [ISO_CODES.TJ]: 9,
};

export function AtlasMap() {
  const { data: geo, loading, error } = useGeo();
  const { select } = useSelection();
  const [hover, setHover] = useState<{ loc: MapLocation; x: number; y: number } | null>(null);

  if (loading) {
    return (
      <div className="aspect-[2/1] w-full border border-edge-soft rounded-sm flex items-center justify-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone-3 animate-pulse">
          загружаем географию…
        </p>
      </div>
    );
  }

  if (error || !geo || !geo.russia) {
    return (
      <div className="aspect-[2/1] w-full border border-red-900/40 rounded-sm flex items-center justify-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-red-400/80">
          ошибка загрузки карты
        </p>
      </div>
    );
  }

  const allFeatures = [geo.russia, ...geo.cis];

  const allLocations: MapLocation[] = [
    ...russiaCities.map(fromRussiaCity),
    ...cisCountries.flatMap(country =>
      country.cities.filter(c => c.coordinates).map(c => fromCISCity(country, c))
    ),
  ];
  const maxCount = Math.max(...allLocations.map(l => l.doctorsCount));

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full"
      >
        <LatitudeStrip />

        <div className="border-t border-b border-edge-soft py-2">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={PROJECTION_CONFIG}
            width={1000}
            height={500}
            style={{ width: '100%', height: 'auto', display: 'block' }}
            aria-label="Карта России и стран СНГ"
          >
            {/* Заливки стран */}
            <Geographies geography={{ type: 'FeatureCollection', features: allFeatures } as any}>
              {({ geographies }) =>
                geographies.map((g) => {
                  const isRussia = String(g.id) === ISO_CODES.RU;
                  return (
                    <Geography
                      key={g.rsmKey}
                      geography={g}
                      style={{
                        default: {
                          fill: isRussia ? '#1E2937' : '#1F2A2C',
                          stroke: isRussia ? '#475569' : '#4F5B5C',
                          strokeWidth: 0.5,
                          outline: 'none',
                          transition: 'fill 300ms ease',
                        },
                        hover: {
                          fill: isRussia ? '#2D3B4D' : '#2E3A3D',
                          stroke: isRussia ? '#64748B' : '#6B7677',
                          strokeWidth: 0.6,
                          outline: 'none',
                        },
                        pressed: {
                          fill: isRussia ? '#2D3B4D' : '#2E3A3D',
                          outline: 'none',
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {/* Лейблы стран */}
            <Geographies geography={{ type: 'FeatureCollection', features: allFeatures } as any}>
              {({ geographies }) =>
                geographies.map((g) => {
                  const id = String(g.id);
                  const label = COUNTRY_LABELS[id];
                  if (!label) return null;

                  const coords: [number, number] =
                    MANUAL_CENTROIDS[id] ?? (geoCentroid(g) as [number, number]);
                  if (!coords || isNaN(coords[0])) return null;

                  const fontSize = LABEL_FONT_SIZE[id] ?? 11;

                  return (
                    <Marker key={`label-${id}`} coordinates={coords}>
                      <text
                        textAnchor="middle"
                        style={{
                          fontFamily: 'Fraunces, serif',
                          fontStyle: 'italic',
                          fontWeight: 300,
                          fontSize,
                          fill: '#475569',
                          letterSpacing: '0.12em',
                          pointerEvents: 'none',
                        }}
                      >
                        {label}
                      </text>
                    </Marker>
                  );
                })
              }
            </Geographies>

            {/* Маркеры городов */}
            {allLocations.map((loc, idx) => (
              <CityMarker
                key={loc.id}
                coordinates={[loc.coordinates[1], loc.coordinates[0]]}
                count={loc.doctorsCount}
                label={loc.city}
                variant={loc.variant}
                index={idx}
                onHover={(e) => setHover({ loc, x: e.clientX, y: e.clientY })}
                onLeave={() => setHover(null)}
                onClick={() => {
                  setHover(null);
                  select(loc);
                }}
              />
            ))}
          </ComposableMap>
        </div>

        <CoordinateMeta />
      </motion.div>

      <MarkerTooltip
        location={hover?.loc ?? null}
        position={hover ? { x: hover.x, y: hover.y } : null}
        maxCount={maxCount}
      />
    </>
  );
}

function LatitudeStrip() {
  const lats = [40, 50, 60, 70];
  return (
    <div className="flex justify-between px-1 pb-2">
      {lats.map((lat) => (
        <div key={lat} className="flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone-3/60 tabular-nums">
            {lat}°N
          </span>
          <span className="h-px w-8 bg-edge-soft" />
        </div>
      ))}
    </div>
  );
}

function CoordinateMeta() {
  return (
    <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-ru" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-2">
            россия
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cis" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-2">
            снг
          </span>
        </div>
        <div className="flex items-center gap-2 text-bone-3/70">
          <span className="w-1.5 h-1.5 rounded-full bg-bone-3/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-bone-3/70" />
          <span className="w-3.5 h-3.5 rounded-full bg-bone-3/70" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] ml-1">
            размер · число врачей
          </span>
        </div>
      </div>
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone-3/50">
        проекция · меркатор · scale 280
      </span>
    </div>
  );
}
