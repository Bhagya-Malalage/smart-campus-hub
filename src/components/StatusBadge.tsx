import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const colorMap: Record<string, string> = {
  ACTIVE: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'OUT_OF_SERVICE': 'bg-red-100 text-red-700 border-red-200',
  Pending: 'bg-amber-100 text-amber-700 border-amber-200',
  Approved: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Rejected: 'bg-red-100 text-red-700 border-red-200',
  Cancelled: 'bg-gray-100 text-gray-500 border-gray-200',
  Open: 'bg-blue-100 text-blue-700 border-blue-200',
  'In Progress': 'bg-amber-100 text-amber-700 border-amber-200',
  Resolved: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Closed: 'bg-gray-100 text-gray-500 border-gray-200',
  Low: 'bg-gray-100 text-gray-600 border-gray-200',
  Medium: 'bg-blue-100 text-blue-700 border-blue-200',
  High: 'bg-amber-100 text-amber-700 border-amber-200',
  Critical: 'bg-red-100 text-red-700 border-red-200',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
      colorMap[status] || 'bg-gray-100 text-gray-600 border-gray-200',
      className
    )}>
      {status}
    </span>
  );
}
