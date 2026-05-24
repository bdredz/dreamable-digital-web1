/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface DreamableLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export default function DreamableLogo({ className = 'h-10', variant = 'dark' }: DreamableLogoProps) {
  const isDark = variant === 'dark';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* Represent the logo image attached using perfect inline SVG vector components */}
      <div className="relative flex items-center justify-center p-1">
        {/* Black Cloud base */}
        <svg
          viewBox="0 0 120 70"
          className="w-24 h-14 drop-shadow-sm transition-transform hover:scale-[1.01]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cloud Path resembling the image attached */}
          <path
            d="M93.5 35.1c-1.3-15.1-13.3-27.1-28.5-27.1c-11.2 0-21 6.5-25.9 16c-3.1-2.4-7-3.9-11.3-3.9C18.2 20.1 9 29.3 9 40.7C9 52.1 18.2 61.3 29.6 61.3h61.7c10 0 18.2-8.2 18.2-18.2C109.5 37 102.5 35.4 93.5 35.1z"
            fill={isDark ? '#FFFFFF' : '#171717'}
          />
          {/* Sparkles Representation (4-point stars) */}
          {/* Left Sparkle */}
          <path
            d="M 23 42.5 c 1 0 1.5 -0.5 1.5 -1.5 c 0 1 0.5 1.5 1.5 1.5 c -1 0 -1.5 0.5 -1.5 1.5 c 0 -1 -0.5 -1.5 -1.5 -1.5 Z"
            fill={isDark ? '#171717' : '#FFFFFF'}
          />
          {/* Right Sparkle */}
          <path
            d="M 94 42.5 c 1 0 1.5 -0.5 1.5 -1.5 c 0 1 0.5 1.5 1.5 1.5 c -1 0 -1.5 0.5 -1.5 1.5 c 0 -1 -0.5 -1.5 -1.5 -1.5 Z"
            fill={isDark ? '#171717' : '#FFFFFF'}
          />
          {/* D R E A M A B L E Text inside cloud */}
          <text
            x="59"
            y="44"
            fill={isDark ? '#171717' : '#FFFFFF'}
            fontFamily="'Inter', ui-sans-serif, system-ui, sans-serif"
            fontSize="5.2"
            fontWeight="700"
            letterSpacing="3.5"
            textAnchor="middle"
          >
            DREAMABLE
          </text>
        </svg>
      </div>
    </div>
  );
}
