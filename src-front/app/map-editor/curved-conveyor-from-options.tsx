import React, { useEffect } from "react";
import styled from "styled-components";

import { CurvedConveyorMapItem } from "dist-common/game-types";

const FromCheckboxLabel = styled.label`
  display: block;
`;

interface FromCheckboxProps {
  value: CurvedConveyorMapItem["direction"];
  fromDirection: CurvedConveyorMapItem["fromDirection"];
  onChange: (_: CurvedConveyorMapItem["fromDirection"]) => void | Promise<void>;
}

const FromCheckbox = ({
  value,
  fromDirection,
  onChange,
}: FromCheckboxProps) => (
  <FromCheckboxLabel>
    <input
      type="checkbox"
      checked={fromDirection.includes(value)}
      onChange={(e) => {
        e.target.checked;
        const fromSet = new Set(fromDirection);
        if (e.target.checked) {
          onChange([...fromSet.add(value)]);
        } else {
          onChange([...fromSet].filter((a) => a !== value));
        }
      }}
    />
    {value}
  </FromCheckboxLabel>
);

interface CurvedConveyorFromOptionsProps {
  direction: CurvedConveyorMapItem["direction"];
  fromDirection: CurvedConveyorMapItem["fromDirection"];
  onChange: (_: CurvedConveyorMapItem["fromDirection"]) => void | Promise<void>;
}

export default function CurvedConveyorFromOptions({
  direction,
  fromDirection,
  onChange,
}: CurvedConveyorFromOptionsProps) {
  const otherDirections = (["up", "right", "down", "left"] as const).filter(
    (a) => a !== direction
  );

  useEffect(() => {
    onChange(fromDirection.filter((d) => d !== direction));
  }, [direction]);

  return (
    <div>
      {otherDirections.map((d) => (
        <FromCheckbox
          key={`curved-conveyor-from-${d}`}
          value={d}
          fromDirection={fromDirection}
          onChange={onChange}
        />
      ))}
    </div>
  );
}

/**
 * <input
                    value={
                      (extraOptions as { tempFromDirection: string })
                        .tempFromDirection || ""
                    }
                    type="string"
                    onChange={(e) => {
                      setExtraOptions((prev) => ({
                        ...prev,
                        tempFromDirection: e.target.value,
                      }));
                    }}
                  />
 */
