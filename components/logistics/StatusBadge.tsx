import React from 'react';

type StatusType = 
  | 'upcoming' | 'in_transit' | 'delivered' | 'delayed' | 'cancelled'
  | 'available' | 'on_trip' | 'off_duty' | 'suspended'
  | 'active' | 'maintenance' | 'idle' | 'retired'
  | 'scheduled' | 'in_progress' | 'completed'
  | 'draft' | 'sent' | 'paid' | 'overdue';

interface StatusBadgeProps {
  status: StatusType;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStyles = (status: StatusType) => {
    switch (status) {
      // Load Statuses
      case 'upcoming':
        return { bg: 'ls-badge-upcoming', label: 'Upcoming' };
      case 'in_transit':
        return { bg: 'ls-badge-transit', label: 'In Transit' };
      case 'delivered':
        return { bg: 'ls-badge-delivered', label: 'Delivered' };
      case 'delayed':
        return { bg: 'ls-badge-delayed', label: 'Delayed' };
      case 'cancelled':
        return { bg: 'ls-badge-delayed border-rose-500/30 text-rose-400 bg-rose-500/10', label: 'Cancelled' };

      // Driver Statuses
      case 'available':
        return { bg: 'ls-badge-transit', label: 'Available' };
      case 'on_trip':
        return { bg: 'ls-badge-upcoming', label: 'On Trip' };
      case 'off_duty':
        return { bg: 'ls-badge-delivered', label: 'Off Duty' };
      case 'suspended':
        return { bg: 'ls-badge-delayed border-rose-500/30 text-rose-400 bg-rose-500/10', label: 'Suspended' };

      // Vehicle Statuses
      case 'active':
        return { bg: 'ls-badge-transit', label: 'Active' };
      case 'maintenance':
        return { bg: 'ls-badge-delayed', label: 'Maintenance' };
      case 'idle':
        return { bg: 'ls-badge-upcoming', label: 'Idle' };
      case 'retired':
        return { bg: 'ls-badge-delivered', label: 'Retired' };

      // Maintenance Statuses
      case 'scheduled':
        return { bg: 'ls-badge-upcoming', label: 'Scheduled' };
      case 'in_progress':
        return { bg: 'ls-badge-delayed', label: 'In Progress' };
      case 'completed':
        return { bg: 'ls-badge-transit', label: 'Completed' };

      // Invoice Statuses
      case 'draft':
        return { bg: 'ls-badge-delivered', label: 'Draft' };
      case 'sent':
        return { bg: 'ls-badge-upcoming', label: 'Sent' };
      case 'paid':
        return { bg: 'ls-badge-transit', label: 'Paid' };
      case 'overdue':
        return { bg: 'ls-badge-delayed border-rose-500/30 text-rose-400 bg-rose-500/10', label: 'Overdue' };

      default:
        return { bg: 'ls-badge-delivered', label: String(status) };
    }
  };

  const { bg, label } = getStyles(status);

  return (
    <span className={`ls-badge ${bg}`}>
      {label}
    </span>
  );
}
