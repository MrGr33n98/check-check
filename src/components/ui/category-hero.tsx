import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from './badge';

type CategoryHeroProps = {
  title: string;
  subtitle?: string;
  countBadge?: string;
  theme?: 'soft' | 'brand' | { from: string; to: string };
  backgroundImageUrl?: string;
  rightSlot?: React.ReactNode;
  className?: string;
};

const gradients = {
  soft:  'from-violet-50 to-blue-50',
  brand: 'from-indigo-100 to-sky-100',
};

export default function CategoryHero({
  title,
  subtitle,
  countBadge,
  theme = 'soft',
  backgroundImageUrl,
  rightSlot,
  className,
}: CategoryHeroProps) {
  const gradient =
    typeof theme === 'string'
      ? gradients[theme]
      : `${theme.from} ${theme.to}`;

  return (
    <section className={cn('relative overflow-hidden min-h-[160px] md:min-h-[180px] flex items-center', className)}>
      {/* BG layer */}
      <div className={cn('absolute inset-0 bg-gradient-to-r', gradient)} />

      {/* Optional image */}
      {backgroundImageUrl && (
        <img
          src={backgroundImageUrl}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
      )}

      <div className="relative container mx-auto px-4 py-6 md:py-8">
        <div className="flex items-start justify-between gap-4">
          <div className="max-w-3xl">
            {countBadge && (
              <Badge className="mb-2 bg-white/70 text-slate-700 border-white/60 backdrop-blur">
                {countBadge}
              </Badge>
            )}
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-sm md:text-base text-slate-600">
                {subtitle}
              </p>
            )}
          </div>
          {rightSlot && <div className="flex-shrink-0">{rightSlot}</div>}
        </div>
      </div>
    </section>
  );
}
