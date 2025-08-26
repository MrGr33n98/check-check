import React from 'react';
import { cn } from '@/lib/utils';

interface ImagePlaceholderProps {
  width?: number;
  height?: number;
  className?: string;
  children?: React.ReactNode;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({ 
  width = 200, 
  height = 200, 
  className,
  children 
}) => {
  return (
    <div 
      className={cn(
        "bg-gradient-to-br from-blue-100 to-green-100 border-2 border-dashed border-blue-200 rounded-xl flex items-center justify-center",
        className
      )}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {children || (
        <div className="text-center p-4">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
          <p className="text-gray-500 text-sm mt-2">Imagem em breve</p>
        </div>
      )}
    </div>
  );
};

export default ImagePlaceholder;