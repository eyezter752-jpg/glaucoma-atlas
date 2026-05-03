import { feature } from 'topojson-client';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import { ISO_CODES, TARGET_COUNTRIES } from '@/data/countries-iso';

interface CountryFeature extends Feature<Geometry> {
  id: string;
  properties: { name: string };
}

export interface GeoData {
  russia: CountryFeature | null;
  cis: CountryFeature[];
}

export async function loadGeo(): Promise<GeoData> {
  const url = `${import.meta.env.BASE_URL}geo/world-110m.json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to load geo: ${response.status}`);
  const topology = await response.json();

  const countries = feature(topology, topology.objects.countries) as unknown as FeatureCollection<Geometry>;
  const filtered = countries.features.filter(f =>
    (TARGET_COUNTRIES as string[]).includes(String(f.id))
  ) as CountryFeature[];

  const russia = filtered.find(f => String(f.id) === ISO_CODES.RU) ?? null;
  const cis = filtered.filter(f => String(f.id) !== ISO_CODES.RU);
  return { russia, cis };
}
