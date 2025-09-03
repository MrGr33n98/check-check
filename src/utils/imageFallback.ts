import placeholder1200x400 from '@/assets/placeholder-1200x400.jpg';
import placeholder300x200 from '@/assets/placeholder-300x200.jpg';
import placeholder80x80 from '@/assets/placeholder-80x80.jpg';

export function getPlaceholderImage(width: number, height: number): string {
  if (width === 1200 && height === 400) {
    return placeholder1200x400;
  } else if (width === 300 && height === 200) {
    return placeholder300x200;
  } else if (width === 80 && height === 80) {
    return placeholder80x80;
  } else {
    // Fallback for other sizes or if no specific placeholder is found
    return `https://placehold.co/${width}x${height}/png`;
  }
}

export function heroFallback(w: number = 1200, h: number = 400): string {
  return getPlaceholderImage(w, h);
}
