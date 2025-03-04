
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface GaugeChartProps {
  value: number;
  max?: number;
  title?: string;
  className?: string;
  colors?: {
    primary: string;
    background: string;
  };
  size?: number;
  thickness?: number;
}

const GaugeChart = ({
  value,
  max = 100,
  title,
  className,
  colors = {
    primary: '#3b82f6',
    background: '#e5e7eb',
  },
  size = 120,
  thickness = 20,
}: GaugeChartProps) => {
  // Ensure value is between 0 and max
  const clampedValue = Math.min(Math.max(0, value), max);
  const percentage = (clampedValue / max) * 100;

  // Data for the gauge chart
  const data = [
    { name: 'Value', value: percentage },
    { name: 'Remaining', value: 100 - percentage },
  ];

  // Settings for the gauge appearance
  const startAngle = 180;
  const endAngle = 0;

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div style={{ width: size, height: size / 2 }} className="relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="100%"
              startAngle={startAngle}
              endAngle={endAngle}
              innerRadius={size / 2 - thickness}
              outerRadius={size / 2}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
              cornerRadius={0}
            >
              <Cell fill={colors.primary} />
              <Cell fill={colors.background} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div
          className="absolute inset-0 flex items-center justify-center bottom-0"
          style={{ paddingBottom: thickness / 2 }}
        >
          <span className="text-2xl font-bold">{value}%</span>
        </div>
      </div>
      {title && <div className="mt-2 text-center text-sm text-muted-foreground">{title}</div>}
    </div>
  );
};

export default GaugeChart;
