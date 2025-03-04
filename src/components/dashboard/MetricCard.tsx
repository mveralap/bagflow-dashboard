
import { cn } from '@/lib/utils';
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  valueClassName?: string;
}

const MetricCard = ({
  title,
  value,
  description,
  icon,
  trend,
  className,
  valueClassName,
}: MetricCardProps) => {
  return (
    <div className={cn("card-dashboard flex flex-col animate-enter", className)}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <div>{icon}</div>}
      </div>
      
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <span className={cn("dashboard-metric", valueClassName)}>{value}</span>
          {description && (
            <span className="text-xs text-muted-foreground mt-1">{description}</span>
          )}
        </div>
        
        {trend && (
          <div className={cn(
            "flex items-center text-xs font-medium",
            trend.isPositive ? "text-green-500" : "text-red-500"
          )}>
            <span className="mr-1">
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
