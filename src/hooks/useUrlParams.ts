'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const useUrlParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const addQuery = useCallback(
    (name: string, value: string | number | string[]) => {
      const params = new URLSearchParams(searchParams.toString());

      if (Array.isArray(value)) {
        params.delete(name);
        value.forEach(item => params.append(name, item));
      } else {
        params.set(name, String(value));
      }

      router.push(pathname + '?' + params.toString(), { scroll: false });
    },
    [searchParams, pathname, router],
  );

  const removeQuery = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      router.push(pathname + '?' + params.toString(), { scroll: false });
    },
    [searchParams, pathname, router],
  );

  return { addQuery, removeQuery, searchParams };
};
