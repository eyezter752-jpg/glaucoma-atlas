// ISO 3166-1 numeric коды для world-atlas
export const ISO_CODES = {
  RU: '643',
  KZ: '398',
  UZ: '860',
  BY: '112',
  TJ: '762',
} as const;

export const TARGET_COUNTRIES = Object.values(ISO_CODES);
