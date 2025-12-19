import { Orientation } from '@/types';
import { Badge } from '@/components/ui/badge';

interface OrientationBadgeProps {
  orientation: Orientation;
}

export function OrientationBadge({ orientation }: OrientationBadgeProps) {
  const getLabel = () => {
    switch (orientation) {
      case 'H':
        return 'H';
      case 'V':
        return 'V';
      case 'H+V':
        return 'H+V';
    }
  };

  const getDescription = () => {
    switch (orientation) {
      case 'H':
        return 'Horizontal only';
      case 'V':
        return 'Vertical only';
      case 'H+V':
        return 'Horizontal + Vertical';
    }
  };

  return (
    <Badge variant="outline" className="text-xs" title={getDescription()}>
      {getLabel()}
    </Badge>
  );
}

