import { Orientation } from '@/types';
import {
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
} from '@heroicons/react/20/solid';

interface OrientationBadgeProps {
  orientation: Orientation;
}

export function OrientationBadge({ orientation }: OrientationBadgeProps) {
  const config = {
    H: {
      label: 'H',
      title: 'Horizontal orientation',
      icon: ArrowsPointingOutIcon,
      className: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20',
    },
    V: {
      label: 'V',
      title: 'Vertical orientation',
      icon: ArrowsPointingInIcon,
      className:
        'bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-600/20',
    },
    'H+V': {
      label: 'H+V',
      title: 'Both horizontal and vertical',
      icon: ArrowsPointingOutIcon,
      className:
        'bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-600/20',
    },
  };

  const { label, title, icon: Icon, className } = config[orientation];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${className}`}
      title={title}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}
