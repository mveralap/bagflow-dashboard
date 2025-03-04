
import { cn } from '@/lib/utils';
import React from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  tools?: React.ReactNode;
}

const ChartCard = ({
  title,
  subtitle,
  children,
  className,
  titleClassName,
  tools,
}: ChartCardProps) => {
  return (
    <div className={cn("card-dashboard", className)}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className={cn("dashboard-subtitle", titleClassName)}>{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {tools && <div className="flex items-center gap-2">{tools}</div>}
      </div>
      
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
