
import React from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange?: (date: string) => void;
  onEndDateChange?: (date: string) => void;
  className?: string;
}

const DateRangePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  className
}: DateRangePickerProps) => {
  return (
    <div className={cn("flex items-center gap-2 bg-white/90 border border-border rounded-md px-3 py-2 shadow-sm", className)}>
      <Calendar size={16} className="text-muted-foreground" />
      
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange?.(e.target.value)}
          className="bg-transparent border-none outline-none text-sm w-32"
        />
        
        <span className="text-muted-foreground">-</span>
        
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange?.(e.target.value)}
          className="bg-transparent border-none outline-none text-sm w-32"
        />
      </div>
      
      <button className="text-muted-foreground">
        <ChevronDown size={16} />
      </button>
    </div>
  );
};

export default DateRangePicker;
