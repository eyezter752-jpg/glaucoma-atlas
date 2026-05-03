import rawData from './doctors.json';
import type { AtlasData } from './types';

export const data = rawData as AtlasData;
export const russiaCities = data.russia;
export const cisCountries = data.cis;
export const totalDoctors = data.meta.totalRussiaDoctors + data.meta.totalCISDoctors;
export const totalCities =
  data.meta.totalRussiaCities +
  data.cis.reduce((sum, country) => sum + country.cities.length, 0);
