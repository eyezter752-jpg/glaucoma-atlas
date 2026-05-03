export interface Specialization {
  diagnostics: boolean;
  surgery: boolean;
  raw: string;
  note?: string;
}

export interface Doctor {
  id: string;
  fullName: string;
  specialization: Specialization;
  profileUrl: string | null;
  actualCity?: string;
  workplace?: string;
  city?: string;
}

export interface RussiaCity {
  id: string;
  city: string;
  region: string;
  coordinates: [number, number];
  country: 'RU';
  doctorsCount: number;
  doctors: Doctor[];
}

export interface CISCity {
  id: string;
  city: string;
  coordinates: [number, number] | null;
  doctorsCount: number;
  doctors: Doctor[];
}

export interface CISCountry {
  id: string;
  country: string;
  code: string;
  flag: string;
  doctorsCount: number;
  cities: CISCity[];
}

export interface AtlasMeta {
  generated: string;
  source: string;
  totalRussiaCities: number;
  totalRussiaDoctors: number;
  totalCISCountries: number;
  totalCISDoctors: number;
}

export interface AtlasData {
  meta: AtlasMeta;
  russia: RussiaCity[];
  cis: CISCountry[];
}
