import { useState } from 'react';

export function useABTest(experimentName: string, variants = ['A', 'B']) {
  const [variant, setVariant] = useState(() => {
    if (typeof window === 'undefined') {
      return variants[0];
    }
    const key = `ab_test_${experimentName}`;
    const storedVariant = localStorage.getItem(key);
    if (storedVariant && variants.includes(storedVariant)) {
      return storedVariant;
    }
    const randomVariant = variants[Math.floor(Math.random() * variants.length)];
    localStorage.setItem(key, randomVariant);
    return randomVariant;
  });

  return variant;
}
