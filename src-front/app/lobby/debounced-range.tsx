import React, { useState, useRef, useEffect } from "react";

interface DebouncedRangeProps {
  className?: string;
  value: number;
  min: number;
  max: number;
  onChange: (_: number) => void | Promise<void>;
  onChangeDebounced: (_: number) => void | Promise<void>;
  debounceMs?: number;
  disabled: boolean;
}

export default function DebouncedRange({
  className,
  min,
  max,
  value,
  onChange,
  onChangeDebounced,
  debounceMs,
  disabled,
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
        if (disabled) {
          return;
        }

        const newValue = parseInt(e.target.value, 10);
        setTempValue(newValue);
        onChange(newValue);

        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }

        if (value !== newValue) {
          debounceTimeoutRef.current = setTimeout(() => {
            onChangeDebounced(newValue);
          }, debounceMs || 200);
        }
      }}
    />
  );
}
