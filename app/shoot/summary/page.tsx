'use client';

import { useRouter } from 'next/navigation';
import { useShoot } from '@/lib/hooks/useShoot';
import { ShootSummary } from '@/components/ShootSummary';
import { calculateTotals } from '@/lib/utils/calculate-totals';
import { useEffect, useState } from 'react';

export default function SummaryPage() {
  const router = useRouter();
  const { shoot, clearShoot } = useShoot();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    if (!shoot) {
      router.push('/');
      return;
    }

    if (shoot.status !== 'completed') {
      router.push('/shoot');
      return;
    }
  }, [shoot, router, isClient]);

  if (!isClient || !shoot) {
    return null;
  }

  const totals = calculateTotals(shoot.rooms);

  const handleStartNew = () => {
    clearShoot();
    router.push('/');
  };

  return <ShootSummary shoot={shoot} totals={totals} onStartNew={handleStartNew} />;
}

