import { AtlasMap } from '@/components/map/AtlasMap';
import { totalDoctors, totalCities, data } from '@/data';

export function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
      <div className="max-w-3xl mb-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone-3 mb-6">
          интерактивный справочник
        </p>
        <h1 className="font-display font-light text-5xl md:text-7xl text-bone leading-[0.95] mb-8">
          Глаукоматологи<br/>России и СНГ
        </h1>
        <p className="text-bone-2 text-lg leading-relaxed max-w-xl mb-10">
          {totalDoctors} врачей в {totalCities} городах. Кликните по точке на карте, чтобы открыть список специалистов региона.
        </p>

        <div className="flex gap-12">
          <div>
            <div className="font-display font-light text-4xl text-ru tabular-nums">
              {data.meta.totalRussiaDoctors}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-bone-3 mt-2">
              россия · {data.meta.totalRussiaCities} городов
            </div>
          </div>
          <div>
            <div className="font-display font-light text-4xl text-cis tabular-nums">
              {data.meta.totalCISDoctors}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-bone-3 mt-2">
              снг · {data.meta.totalCISCountries} страны
            </div>
          </div>
        </div>
      </div>

      <AtlasMap />
    </div>
  );
}
