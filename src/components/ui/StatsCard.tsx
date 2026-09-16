import React from 'react';
import { Card } from './Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
}) => {
  return (
    <Card className="flex flex-col justify-between relative overflow-hidden">
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            {title}
          </span>
          <h3 className="text-2xl font-extrabold text-stone-900 mt-1 tracking-tight">
            {value}
          </h3>
        </div>
        <div className="w-11 h-11 rounded-xl bg-amber-50 text-[#4A2E18] flex items-center justify-center shrink-0">
          {icon}
        </div>
      </div>
      {(subtitle || trend) && (
        <div className="flex items-center gap-2 text-xs pt-2 border-t border-stone-100 text-stone-500">
          {trend && (
            <span
              className={`font-semibold ${
                trend.isPositive ? 'text-emerald-600' : 'text-stone-600'
              }`}
            >
              {trend.value}
            </span>
          )}
          {subtitle && <span>{subtitle}</span>}
        </div>
      )}
    </Card>
  );
};
