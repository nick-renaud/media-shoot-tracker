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
    const tierPrefix = selectedTier.split('_')[0]?.toUpperCase() || 'S';
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg">
              <span className="text-3xl font-bold text-white">
                {tierPrefix}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Ready to Start</h1>
            <p className="mt-2 text-lg text-slate-600">
              Who's shooting today?
            </p>
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-2">
              <label htmlFor="photographer" className="text-sm font-medium text-slate-700">
                Photographer Name
              </label>
              <Input
                id="photographer"
                placeholder="Enter your name"
                value={photographer}
                onChange={(e) => setPhotographer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && photographer.trim()) {
                    handleStart();
                  }
                }}
                autoFocus
                className="h-12 text-lg"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setSelectedTier(null)}
                className="flex-1 h-12"
              >
                Back
              </Button>
              <Button
                onClick={handleStart}
                disabled={!photographer.trim()}
                className="flex-1 h-12 text-base font-semibold"
              >
                Start Shoot →
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <TemplateSelector onSelectTier={handleSelectTier} />;
}
