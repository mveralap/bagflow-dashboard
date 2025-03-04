
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const FilterDropdown = ({
  label,
  options,
  value,
  onChange,
  className,
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 bg-white/90 border border-border rounded-md px-3 py-2 text-sm shadow-sm",
          className
        )}
      >
        <span className="text-muted-foreground">{label}:</span>
        <span>{value}</span>
        <ChevronDown size={16} className={cn("transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-md shadow-lg border border-border z-10 animate-fade-in">
          <div className="py-1 max-h-48 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors",
                  value === option && "bg-muted font-medium"
                )}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
