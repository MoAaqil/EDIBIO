import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand
        brand: {
          primary: '#2563EB',
          accent:  '#1D4ED8',
          light:   '#EEF4FF',
          mid:     '#DBEAFE',
          dark:    '#1E3A8A',
        },
        // Semantic
        success:  '#22C55E',
        warning:  '#F59E0B',
        danger:   '#EF4444',
        // Surface
        surface: {
          bg:     '#FAFAFB',
          card:   '#FFFFFF',
          border: '#ECECEC',
        },
        // Text
        ink: {
          primary:   '#0F172A',
          secondary: '#64748B',
          tertiary:  '#9CA3AF',
          disabled:  '#D1D5DB',
        },
        // Dark mode surfaces
        dark: {
          bg:     '#0B1220',
          card:   '#111827',
          border: '#1E293B',
          accent: '#3B82F6',
        },
        // Shadcn compat
        border:      'hsl(var(--border))',
        input:       'hsl(var(--input))',
        ring:        'hsl(var(--ring))',
        background:  'hsl(var(--background))',
        foreground:  'hsl(var(--foreground))',
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT:    'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },

      borderRadius: {
        none:  '0px',
        sm:    '6px',
        md:    '8px',
        DEFAULT: '10px',
        lg:    '14px',       // buttons, inputs
        xl:    '16px',       // search bar
        '2xl': '18px',       // sidebar
        '3xl': '20px',       // cards
        '4xl': '24px',       // modals
        full:  '9999px',
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },

      fontSize: {
        '2xs': ['11px', { lineHeight: '16px' }],
        xs:    ['12px', { lineHeight: '18px' }],
        sm:    ['13px', { lineHeight: '20px', letterSpacing: '-0.01em' }],
        base:  ['14px', { lineHeight: '22px' }],
        md:    ['15px', { lineHeight: '24px', letterSpacing: '-0.01em' }],
        lg:    ['16px', { lineHeight: '24px' }],
        xl:    ['18px', { lineHeight: '28px', letterSpacing: '-0.02em' }],
        '2xl': ['24px', { lineHeight: '32px', letterSpacing: '-0.02em' }],
        '3xl': ['34px', { lineHeight: '42px', letterSpacing: '-0.02em' }],
      },

      spacing: {
        '4.5':  '18px',
        '5.5':  '22px',
        '18':   '72px',
        '22':   '88px',
        '76':   '304px',
      },

      boxShadow: {
        'sm':      '0 2px 8px rgba(0,0,0,0.04)',
        'card':    '0 8px 25px rgba(0,0,0,0.06)',
        'hover':   '0 16px 40px rgba(0,0,0,0.08)',
        'card-blue': '0 8px 20px rgba(37,99,235,0.06)',
        'dropdown': '0 8px 25px rgba(0,0,0,0.06)',
        'modal':   '0 20px 60px rgba(0,0,0,0.12)',
        'none':    'none',
      },

      animation: {
        'fade-in':       'fadeIn 0.2s ease-out',
        'fade-up':       'fadeUp 0.25s ease-out',
        'slide-in-right':'slideInRight 0.25s ease-out',
        'slide-up':      'slideUp 0.25s cubic-bezier(0.32,0.72,0,1)',
        'scale-in':      'scaleIn 0.15s ease-out',
        'pulse-soft':    'pulseSoft 2s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          from: { transform: 'translateX(100%)' },
          to:   { transform: 'translateX(0)' },
        },
        slideUp: {
          from: { transform: 'translateY(100%)' },
          to:   { transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { transform: 'scale(0.96)', opacity: '0' },
          to:   { transform: 'scale(1)',    opacity: '1' },
        },
        pulseSoft: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
