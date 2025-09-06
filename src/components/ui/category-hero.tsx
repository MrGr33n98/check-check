import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CategoryHeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
}

const CategoryHero: React.FC<CategoryHeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  ctaText = 'Explore Companies',
  ctaLink = '#',
}) => {
  return (
    <section
      className="relative bg-cover bg-center text-white py-16 md:py-24"
      style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none', backgroundColor: !backgroundImage ? '#2c5282' : '' }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          {title}
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
          {subtitle}
        </p>
        {ctaLink && (
          <Button asChild size="lg" className="mt-8">
            <Link to={ctaLink}>
              {ctaText} <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
};

export default CategoryHero;