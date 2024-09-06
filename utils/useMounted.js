'use client';
import { useEffect, useState } from 'react';

export const useMounted = () => {
  const [mounted, setMounted] = useState();
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
};
