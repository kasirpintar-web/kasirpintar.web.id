import React, { useState } from 'react';
import { ImageOff, Sparkles } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  containerClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Image',
  className = '',
  containerClassName = '',
  fallbackTitle = 'Pratinjau Gambar',
  fallbackSubtitle = 'Visual aset dalam proses pemuatan',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!src || hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-6 text-center rounded-2xl bg-neutral-900/60 border border-neutral-800 text-neutral-400 ${containerClassName || className}`}
      >
        <div className="w-12 h-12 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center mb-2 text-neutral-300">
          <ImageOff className="w-6 h-6" />
        </div>
        <p className="text-sm font-medium text-neutral-200">{fallbackTitle}</p>
        <p className="text-xs text-neutral-500 mt-1 max-w-[240px]">{fallbackSubtitle}</p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-900/40 animate-pulse flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-neutral-600 animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        {...props}
      />
    </div>
  );
};
