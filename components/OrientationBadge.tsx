import { Orientation } from '@/types';
import {
  ArrowsRightLeftIcon,
  ArrowsUpDownIcon,
  ArrowsPointingOutIcon,
} from '@heroicons/react/24/outline';

interface OrientationBadgeProps {
  orientation: Orientation;
}

export function OrientationBadge({ orientation }: OrientationBadgeProps) {
  const config = {
    H: {
      label: 'Horizontal',
      title: 'Horizontal orientation',
      icon: ArrowsRightLeftIcon,
      className: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md',
    },
    V: {
      label: 'Vertical',
      title: 'Vertical orientation',
      icon: ArrowsUpDownIcon,
      className: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md',
    },
    'H+V': {
      label: 'Both',
      title: 'Both horizontal and vertical',
      icon: ArrowsPointingOutIcon,
      className: 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md',
    },
  };

  const { label, title, icon: Icon, className } = config[orientation];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-bold ${className}`}
      title={title}
    >
      <Icon className="h-5 w-5" />
      {label}
    </span>
  );
}
