'use client';

import React from 'react';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';

type ToastItem = {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  id: string;
  open: boolean;
};

// Lightweight global toast state — no external dependency needed.
let toastListeners: Array<(toast: Omit<ToastItem, 'open'>) => void> = [];

export function toast({
  title,
  description,
  variant = 'default',
}: {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}) {
  const id = Math.random().toString(36).substring(2);
  toastListeners.forEach(l => l({ title, description, variant, id }));
}

export function Toaster() {
  const [items, setItems] = React.useState<ToastItem[]>([]);

  React.useEffect(() => {
    const listener = (t: Omit<ToastItem, 'open'>) => {
      setItems(prev => [...prev, { ...t, open: true }]);
      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        setItems(prev =>
          prev.map(i => (i.id === t.id ? { ...i, open: false } : i))
        );
      }, 5000);
    };
    toastListeners.push(listener);
    return () => {
      toastListeners = toastListeners.filter(l => l !== listener);
    };
  }, []);

  return (
    <ToastProvider>
      {items.map(({ id, title, description, variant, open }) => (
        <Toast
          key={id}
          open={open}
          onOpenChange={(o: boolean) => {
            if (!o) setItems(prev => prev.filter(i => i.id !== id));
          }}
          variant={variant}
        >
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
