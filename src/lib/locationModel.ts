import type { Doctor, RussiaCity, CISCity, CISCountry } from '@/data/types';

export interface MapLocation {
  id: string;
  city: string;
  subtitle: string;
  countryLabel: string;
  variant: 'ru' | 'cis';
  coordinates: [number, number]; // [lat, lon]
  doctorsCount: number;
  doctors: Doctor[];
}

export function fromRussiaCity(c: RussiaCity): MapLocation {
  return {
    id: c.id,
    city: c.city,
    subtitle: c.region,
    countryLabel: 'Россия',
    variant: 'ru',
    coordinates: c.coordinates,
    doctorsCount: c.doctorsCount,
    doctors: c.doctors,
  };
}

export function fromCISCity(country: CISCountry, c: CISCity): MapLocation {
  return {
    id: c.id,
    city: c.city,
    subtitle: country.country,
    countryLabel: country.country,
    variant: 'cis',
    coordinates: c.coordinates ?? [0, 0],
    doctorsCount: c.doctorsCount,
    doctors: c.doctors,
  };
}
