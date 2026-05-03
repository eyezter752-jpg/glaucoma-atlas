import { ArrowUpRight } from 'lucide-react';
import type { Doctor } from '@/data/types';
import { SpecBadge } from '@/components/ui/SpecBadge';
import { getSpecBadges } from '@/lib/specialization';

interface Props {
  doctor: Doctor;
  selectedCity: string;
}

export function DoctorCard({ doctor, selectedCity }: Props) {
  const badges = getSpecBadges(doctor.specialization);
  const note = doctor.specialization.note;
  const showActualCity = doctor.actualCity && doctor.actualCity !== selectedCity;

  return (
    <article className="group border border-edge-soft p-5 hover:border-edge-mid transition-colors">
      <h3 className="font-display text-lg text-bone leading-tight mb-3">
        {doctor.fullName}
      </h3>

      <div className="flex items-center flex-wrap gap-2 mb-3">
        {badges.map((cat) => (
          <SpecBadge key={cat} category={cat} />
        ))}
        {note && (
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-bone-3 italic">
            · {note}
          </span>
        )}
      </div>

      {doctor.workplace && (
        <p className="text-[13px] text-bone-2 leading-relaxed mb-2">
          {doctor.workplace}
        </p>
      )}

      {showActualCity && (
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-3 mb-3">
          фактически · {doctor.actualCity}
        </p>
      )}

      {doctor.profileUrl && (
        <a
          href={doctor.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-3 hover:text-ru transition-colors mt-1"
        >
          ProDoctorov
          <ArrowUpRight size={12} strokeWidth={1.5} />
        </a>
      )}
    </article>
  );
}
