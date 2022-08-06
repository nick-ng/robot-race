import React from "react";

import { MapItem } from "dist-common/game-types";

interface MapItemSelectProps {
  value: MapItem["type"] | "erase";
  onChange: (_: MapItem["type"] | "erase") => void | Promise<void>;
}

export default function MapItemSelect({ value, onChange }: MapItemSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => {
        onChange(e.target.value as MapItem["type"] | "erase");
      }}
    >
      <option value="erase">Erase</option>
      <option value="dock">Dock Bay</option>
      <option value="flag">Flag</option>
      <option value="wall">Wall</option>
      <option value="pit">Pit</option>
      <option value="straight-conveyor">Straight Conveyor</option>
      <option value="curved-conveyor">Curved Conveyor</option>
      <option value="gear">Gear</option>
      <option value="repair">Repair</option>
      <option value="laser">Laser</option>
    </select>
  );
}
