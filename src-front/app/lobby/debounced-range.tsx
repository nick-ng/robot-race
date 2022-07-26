import React, { useState, useRef, useEffect } from "react";

interface DebouncedRangeProps {
  className?: string;
  value: number;
  min: number;
  max: number;
  onChange: (_: number) => void | Promise<void>;
  onDebouncedChange: (_: number) => void | Promise<void>;
  debounceMs?: number;
}

export default function DebouncedRange({
  className,
  min,
  max,
  value,
  onChange,
  onDebouncedChange,
  debounceMs,
}: DebouncedRangeProps) {
  const [tempValue, setTempValue] = useState(value);
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setTempValue(value);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [value]);

  return (
    <input
      className={className}
      type="range"
      min={min}
      max={max}
      value={tempValue}
      onChange={(e) => {
        const newValue = parseInt(e.target.value, 10);
        setTempValue(newValue);
        onChange(newValue);

        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }

        if (value !== newValue) {
          debounceTimeoutRef.current = setTimeout(() => {
            onDebouncedChange(newValue);
          }, debounceMs || 200);
        }
      }}
    />
  );
}
