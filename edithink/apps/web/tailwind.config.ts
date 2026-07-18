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
          bg:     '#F8FAFC',
          card:   '#FFFFFF',
          border: '#EAECEF',
        },
        // Text
        ink: {
          primary:   '#111827',
          secondary: '#6B7280',
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
        lg:    '12px',       // buttons, inputs
        xl:    '14px',       // search bar
        '2xl': '18px',       // cards
        '3xl': '20px',       // agenda panel, big modals
        full:  '9999px',
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },

      fontSize: {
        '2xs': ['11px', { lineHeight: '16px' }],
        xs:    ['12px', { lineHeight: '18px' }],
        sm:    ['13px', { lineHeight: '20px' }],
        base:  ['14px', { lineHeight: '22px' }],
        md:    ['15px', { lineHeight: '24px' }],
        lg:    ['16px', { lineHeight: '24px' }],
        xl:    ['18px', { lineHeight: '28px' }],
        '2xl': ['20px', { lineHeight: '30px' }],
      },

      spacing: {
        '4.5':  '18px',
        '5.5':  '22px',
        '18':   '72px',
        '22':   '88px',
        '76':   '304px',
      },

      boxShadow: {
        // Only on hover — never as default
        'card':    '0 4px 16px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.08)',
        'card-blue': '0 8px 20px rgba(37,99,235,0.1)',
        'dropdown': '0 4px 20px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.04)',
        'modal':   '0 20px 60px rgba(0,0,0,0.14)',
        'btn':     '0 1px 3px rgba(37,99,235,0.2)',
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
