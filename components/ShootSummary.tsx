'use client';

import { Shoot } from '@/types';
import { ShootTotals } from '@/lib/utils/calculate-totals';
import { Button } from '@/components/ui/button';
import {
  CheckCircleIcon,
  CameraIcon,
  UserIcon,
  DocumentTextIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

interface ShootSummaryProps {
  shoot: Shoot;
  totals: ShootTotals;
  onStartNew: () => void;
}

export function ShootSummary({
  shoot,
  totals,
  onStartNew,
}: ShootSummaryProps) {
  const skippedRooms = shoot.rooms.filter((r) => r.skipped);
  const [isSending, setIsSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSendEmail = async () => {
    setIsSending(true);
    try {
      const response = await fetch('/api/send-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shoot, totals }),
      });

      if (response.ok) {
        setEmailSent(true);
        setTimeout(() => setEmailSent(false), 3000);
      } else {
        alert('Failed to send email. Please try again.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 p-6">
      <div className="mx-auto max-w-2xl space-y-6 py-12">
        {/* Header */}
        <div className="animate-in zoom-in fade-in text-center duration-700">
          <div className="relative mx-auto mb-4 flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-20"></div>
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-2xl">
              <CheckCircleIcon className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 bg-clip-text text-5xl font-bold text-transparent">
            Shoot Complete!
          </h1>
          <p className="mt-3 text-lg font-medium text-slate-600">{shoot.tierDisplayName}</p>
        </div>

        {/* Stats cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div
            className="animate-in fade-in slide-in-from-left-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
            style={{ animationDelay: '200ms' }}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-50 p-3 shadow-sm">
                <UserIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-500">Photographer</div>
                <div className="text-lg font-bold text-slate-900">
                  {shoot.photographer}
                </div>
              </div>
            </div>
          </div>

          <div
            className="animate-in fade-in slide-in-from-right-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
            style={{ animationDelay: '300ms' }}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 p-3 shadow-sm">
                <CameraIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-500">Total Shots</div>
                <div className="text-lg font-bold text-slate-900">
                  {totals.actualTotal} / {shoot.targetShots}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary card */}
        <div
          className="animate-in fade-in slide-in-from-bottom-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          style={{ animationDelay: '400ms' }}
        >
          <h2 className="text-lg font-bold text-slate-900">Summary</h2>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Rooms Completed</span>
              <span className="font-semibold text-slate-900">
                {totals.completedCount} / {totals.totalCount}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Expected Shots</span>
              <span className="font-semibold text-slate-900">
                {totals.expectedTotal}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Actual Shots</span>
              <span className="font-semibold text-slate-900">
                {totals.actualTotal}
              </span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-3 text-sm">
              <span className="font-semibold text-slate-900">Variance</span>
              <span
                className={`font-semibold ${
                  totals.variance >= 0 ? 'text-emerald-600' : 'text-amber-600'
                }`}
              >
                {totals.variance > 0 ? '+' : ''}
                {totals.variance}
              </span>
            </div>
          </div>
        </div>

        {/* Skipped rooms */}
        {skippedRooms.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Skipped Rooms ({skippedRooms.length})
            </h2>
            <ul className="mt-4 space-y-2">
              {skippedRooms.map((room) => (
                <li key={room.id} className="text-sm text-slate-600">
                  • {room.name}
                  {room.notes && ` - ${room.notes}`}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Notes */}
        {shoot.globalNotes && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <DocumentTextIcon className="h-5 w-5 text-slate-400" />
              <h2 className="text-lg font-semibold text-slate-900">Notes</h2>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm text-slate-600">
              {shoot.globalNotes}
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div
          className="animate-in fade-in slide-in-from-bottom-4 space-y-3"
          style={{ animationDelay: '600ms' }}
        >
          <Button
            onClick={handleSendEmail}
            disabled={isSending || emailSent}
            variant="outline"
            className="w-full border-2 border-indigo-200 bg-white hover:bg-indigo-50"
            size="lg"
          >
            <EnvelopeIcon className="mr-2 h-5 w-5" />
            {emailSent ? '✓ Email Sent!' : isSending ? 'Sending...' : 'Email Summary to nick@323media.io'}
          </Button>

          <Button
            onClick={onStartNew}
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-lg transition-all hover:shadow-xl hover:from-indigo-700 hover:to-indigo-600"
            size="lg"
          >
            Start New Shoot
          </Button>
        </div>
      </div>
    </div>
  );
}
