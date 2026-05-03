import { useEffect, useState } from 'react';
import { loadGeo, type GeoData } from '@/lib/loadGeo';

export function useGeo() {
  const [data, setData] = useState<GeoData | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadGeo().then(setData).catch(setError);
  }, []);

  return { data, loading: !data && !error, error };
}
