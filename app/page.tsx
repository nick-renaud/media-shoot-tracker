'use client';

import { useRouter } from 'next/navigation';
import { useShoot } from '@/lib/hooks/useShoot';
import { TemplateSelector } from '@/components/TemplateSelector';
import { PropertyTier } from '@/types';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Home() {
  const router = useRouter();
  const { shoot, startShoot } = useShoot();
  const [photographer, setPhotographer] = useState('');
  const [selectedTier, setSelectedTier] = useState<PropertyTier | null>(null);

  useEffect(() => {
    // If there's an active shoot, redirect to it
    if (shoot && shoot.status === 'active') {
      router.push('/shoot');
    }
  }, [shoot, router]);

  const handleSelectTier = (tier: PropertyTier) => {
    setSelectedTier(tier);
  };

  const handleStart = () => {
    if (!selectedTier || !photographer.trim()) return;

    startShoot(selectedTier, photographer);
    router.push('/shoot');
  };

  if (selectedTier) {
    return (
      <div className="mx-auto max-w-md space-y-6 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Start Shoot</h1>
          <p className="mt-2 text-muted-foreground">
            Enter photographer name
          </p>
        </div>

        <div className="space-y-4">
          <Input
            placeholder="Photographer name"
            value={photographer}
            onChange={(e) => setPhotographer(e.target.value)}
            autoFocus
          />

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setSelectedTier(null)}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={handleStart}
              disabled={!photographer.trim()}
              className="flex-1"
            >
              Start Shoot
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <TemplateSelector onSelectTier={handleSelectTier} />;
}
