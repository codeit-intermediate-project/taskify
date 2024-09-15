import { PluginAPI } from 'tailwindcss/types/config';

import type { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#FAFAFA',
          100: '#EEEEEE',
          200: '#D9D9D9',
          300: '#9FA6B2',
          400: '#787486',
        },
        black: {
          500: '#4B4B4B',
          600: '#333236',
          700: '#171717',
        },
        violet: '#5534DA',
        'violet-white': '#F1EFFD',
        red: '#D6173A',
        green: '#7AC555',
        purple: '#760DDE',
        orange: '#FFA500',
        blue: '#76A5EA',
        pink: '#E876EA',
        'border-gray': '#D9D9D9',
      },
    },
  },
  plugins: [
    ({ addUtilities }: PluginAPI) => {
      addUtilities({
        '.font-xs-12px-regular': {
          fontSize: '12px',
          fontWeight: '400',
          lineHeight: '18px',
          textAlign: 'left',
        },
        '.font-xs-12px-medium': {
          fontSize: '12px',
          fontWeight: '500',
          lineHeight: '18px',
          textAlign: 'left',
        },
        '.font-xs-12px-semibold': {
          fontSize: '12px',
          fontWeight: '600',
          lineHeight: '20px',
          textAlign: 'left',
        },
        '.font-sm-13px-medium': {
          fontSize: '13px',
          fontWeight: '500',
          lineHeight: '22px',
          textAlign: 'left',
        },
        '.font-sm-13px-semibold': {
          fontSize: '13px',
          fontWeight: '600',
          lineHeight: '22px',
          textAlign: 'left',
        },
        '.font-md-14px-regular': {
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: '24px',
          textAlign: 'left',
        },
        '.font-md-14px-medium': {
          fontSize: '14px',
          fontWeight: '500',
          lineHeight: '24px',
          textAlign: 'left',
        },
        '.font-lg-14px-semibold': {
          fontSize: '14px',
          fontWeight: '600',
          lineHeight: '24px',
          textAlign: 'left',
        },
        '.font-lg-14px-bold': {
          fontSize: '14px',
          fontWeight: '700',
          lineHeight: '24px',
          textAlign: 'left',
        },
        '.font-lg-16px-regular': {
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '26px',
          textAlign: 'left',
        },
        '.font-lg-16px-medium': {
          fontSize: '16px',
          fontWeight: '500',
          lineHeight: '26px',
          textAlign: 'left',
        },
        '.font-lg-16px-semibold': {
          fontSize: '16px',
          fontWeight: '600',
          lineHeight: '26px',
          textAlign: 'left',
        },
        '.font-lg-16px-bold': {
          fontSize: '16px',
          fontWeight: '700',
          lineHeight: '26px',
          textAlign: 'left',
        },
        '.font-2lg-18px-regular': {
          fontSize: '18px',
          fontWeight: '400',
          lineHeight: '26px',
          textAlign: 'left',
        },
        '.font-2lg-18px-medium': {
          fontSize: '18px',
          fontWeight: '500',
          lineHeight: '26px',
          textAlign: 'left',
        },
        '.font-2lg-18px-semibold': {
          fontSize: '18px',
          fontWeight: '600',
          lineHeight: '26px',
          textAlign: 'left',
        },
        '.font-2lg-18px-bold': {
          fontSize: '18px',
          fontWeight: '700',
          lineHeight: '26px',
          textAlign: 'left',
        },
        '.font-xl-20px-regular': {
          fontSize: '20px',
          fontWeight: '400',
          lineHeight: '32px',
          textAlign: 'left',
        },
        '.font-xl-20px-medium': {
          fontSize: '20px',
          fontWeight: '500',
          lineHeight: '32px',
          textAlign: 'left',
        },
        '.font-xl-20px-semibold': {
          fontSize: '20px',
          fontWeight: '600',
          lineHeight: '32px',
          textAlign: 'left',
        },
        '.font-xl-20px-bold': {
          fontSize: '20px',
          fontWeight: '700',
          lineHeight: '32px',
          textAlign: 'left',
        },
        '.font-2xl-22px-regular': {
          fontSize: '22px',
          fontWeight: '400',
          lineHeight: '26px',
          textAlign: 'left',
        },
        '.font-2xl-24px-regular': {
          fontSize: '24px',
          fontWeight: '400',
          lineHeight: '32px',
          textAlign: 'left',
        },
        '.font-2xl-24px-medium': {
          fontSize: '24px',
          fontWeight: '500',
          lineHeight: '32px',
          textAlign: 'left',
        },
        '.font-2xl-24px-semibold': {
          fontSize: '24px',
          fontWeight: '600',
          lineHeight: '32px',
          textAlign: 'left',
        },
        '.font-2xl-24px-bold': {
          fontSize: '24px',
          fontWeight: '700',
          lineHeight: '32px',
          textAlign: 'left',
        },
        '.font-2xl-26px-bold': {
          fontSize: '26px',
          fontWeight: '700',
          lineHeight: '26.25px',
          textAlign: 'left',
        },
        '.font-2xl-28px-bold': {
          fontSize: '28px',
          fontWeight: '700',
          lineHeight: '26.25px',
          textAlign: 'left',
        },
        '.font-3xl-32px-semibold': {
          fontSize: '32px',
          fontWeight: '600',
          lineHeight: '42px',
          textAlign: 'left',
        },
        '.font-3xl-32px-bold': {
          fontSize: '32px',
          fontWeight: '700',
          lineHeight: '42px',
          textAlign: 'left',
        },
        '.font-4xl-36px-bold': {
          fontSize: '36px',
          fontWeight: '700',
          lineHeight: '50px',
          textAlign: 'left',
        },
        '.font-4xl-40px-bold': {
          fontSize: '40px',
          fontWeight: '700',
          lineHeight: '48px',
          textAlign: 'left',
        },
        '.font-4xl-42px-bold': {
          fontSize: '42px',
          fontWeight: '700',
          lineHeight: '51px',
          textAlign: 'left',
        },
        '.font-4xl-48px-bold': {
          fontSize: '48px',
          fontWeight: '700',
          lineHeight: '64px',
          textAlign: 'left',
        },
        '.font-4xl-56px-bold': {
          fontSize: '56px',
          fontWeight: '700',
          lineHeight: '100px',
          textAlign: 'left',
        },
        '.font-4xl-70px-bold': {
          fontSize: '70px',
          fontWeight: '700',
          lineHeight: '65px',
          textAlign: 'left',
        },
        '.font-4xl-76px-bold': {
          fontSize: '76px',
          fontWeight: '700',
          lineHeight: '100px',
          textAlign: 'left',
        },
        '.font-4xl-90px-bold': {
          fontSize: '90px',
          fontWeight: '700',
          lineHeight: '65px',
          textAlign: 'left',
        },
      });
    },
  ],
};
export default config;
