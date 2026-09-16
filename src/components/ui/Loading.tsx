import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  message = 'Memuat data...',
  fullScreen = false,
}) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-50/80 backdrop-blur-xs">
        <div className="w-12 h-12 rounded-2xl bg-[#FFE404] flex items-center justify-center shadow-lg shadow-yellow-400/20 mb-4 animate-bounce">
          <Loader2 className="w-6 h-6 text-[#4A2E18] animate-spin" />
        </div>
        <p className="text-sm font-semibold text-stone-700">{message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <Loader2 className="w-8 h-8 text-[#4A2E18] animate-spin mb-3" />
      <p className="text-sm font-medium text-stone-600">{message}</p>
    </div>
  );
};
