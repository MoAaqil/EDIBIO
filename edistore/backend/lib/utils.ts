import { OrderStatus, COMMISSION_RATES } from './types';

// Get commission rate for a category
export function getCommissionRate(category: string): number {
  return COMMISSION_RATES[category] || COMMISSION_RATES.default;
}

// Calculate commission amount
export function calculateCommission(price: number, qty: number, category: string): number {
  const rate = getCommissionRate(category);
  return Number((price * qty * rate).toFixed(2));
}

// Format price in Indian Rupee format (e.g., ₹1,23,456.78 or ₹1,23,456)
export function formatPrice(amount: number): string {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(amount);
}

// Format date to human-readable string (e.g., 2 Jul 2026)
export function formatDate(date: string | Date): string {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// Format date and time (e.g., 2 Jul 2026, 10:30 PM)
export function formatDateTime(date: string | Date): string {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

// Generate unique order number (e.g., EDI-2026-12345)
export function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000); // 5 digit random number
  return `EDI-${year}-${random}`;
}

// Convert string to slug (e.g., "Raj Supermarket" -> "raj-supermarket")
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

// Truncate text to a maximum length
export function truncate(text: string, max: number): string {
  if (!text) return '';
  if (text.length <= max) return text;
  return text.slice(0, max) + '...';
}

// Get status color (hex) for styling
export function getStatusColor(status: OrderStatus): string {
  switch (status) {
    case 'placed':
      return '#3b82f6'; // Blue
    case 'confirmed':
      return '#6366f1'; // Indigo
    case 'packed':
      return '#f59e0b'; // Amber
    case 'shipped':
      return '#8b5cf6'; // Purple
    case 'out_for_delivery':
      return '#ec4899'; // Pink
    case 'delivered':
      return '#10b981'; // Emerald
    case 'cancelled':
      return '#ef4444'; // Red
    case 'return_requested':
      return '#f97316'; // Orange
    case 'returned':
      return '#6b7280'; // Gray
    default:
      return '#9ca3af'; // Light gray
  }
}

// Get human-readable status label
export function getStatusLabel(status: OrderStatus): string {
  switch (status) {
    case 'placed':
      return 'Order Placed';
    case 'confirmed':
      return 'Confirmed';
    case 'packed':
      return 'Packed';
    case 'shipped':
      return 'Shipped';
    case 'out_for_delivery':
      return 'Out for Delivery';
    case 'delivered':
      return 'Delivered';
    case 'cancelled':
      return 'Cancelled';
    case 'return_requested':
      return 'Return Requested';
    case 'returned':
      return 'Returned';
    default:
      return 'Unknown';
  }
}

// Get status icon (emoji)
export function getStatusIcon(status: OrderStatus): string {
  switch (status) {
    case 'placed':
      return '📝';
    case 'confirmed':
      return '✅';
    case 'packed':
      return '📦';
    case 'shipped':
      return '🚚';
    case 'out_for_delivery':
      return '🛵';
    case 'delivered':
      return '🎁';
    case 'cancelled':
      return '❌';
    case 'return_requested':
      return '🔄';
    case 'returned':
      return '↩️';
    default:
      return '❓';
  }
}

// Generate unique ID
export function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
