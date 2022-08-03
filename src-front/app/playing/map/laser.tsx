import React from "react";
import styled from "styled-components";

import type {
  LaserMapItem,
  MapItemNoId,
  Robot,
  Position,
  WallMapItem,
  MainGameState,
} from "dist-common/game-types";

import { getLaserTarget } from "../../../../dist-common/get-laser-target";

const GRID_SIZE = 2.8;
const LASER_INSET = "-2px";

const laserStyle = {
  up: { bottom: LASER_INSET, left: 0, right: 0 },
  down: { top: LASER_INSET, left: 0, right: 0 },
  left: { right: LASER_INSET, top: 0, bottom: 0 },
  right: { left: LASER_INSET, top: 0, bottom: 0 },
} as const;

const StyledLaser = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const LaserBeam = styled.div<{ isShooting: boolean }>`
  position: absolute;
  box-sizing: border-box;
  background-color: ${({ isShooting }) =>
    isShooting ? "#ff0000" : "#ff000055"};
  margin: auto;
`;

const LaserGun = styled.div`
  position: absolute;
  margin: auto;
  background-color: #dcdcdc;
  width: 6px;
  height: 6px;
`;

interface LaserProps {
  cellItems: MapItemNoId[];
  allItems: MapItemNoId[];
  robots: Robot[];
  animations: MainGameState["animations"];
}

export default function Laser({
  cellItems,
  allItems,
  robots,
  animations,
}: LaserProps) {
  const laserItem = cellItems.find((ci) => ci.type === "laser") as
    | LaserMapItem
    | undefined;

  if (!laserItem) {
    return null;
  }

  const isShooting = animations.includes("map-laser");

  const position: Position = {
    x: laserItem.x,
    y: laserItem.y,
    facing: laserItem.direction,
  };

  const nonLengthDimension = isShooting ? "4px" : "2px";
  const laserLengthStyle = {
    width: nonLengthDimension,
    height: nonLengthDimension,
  };

  const laserTarget = getLaserTarget(position, robots, allItems, true);
  if ((laserTarget as WallMapItem | null)?.type === "wall") {
    const extra = 0.45;
    const { x, x1, y, y1 } = laserTarget as WallMapItem;
    if (["up", "down"].includes(laserItem.direction)) {
      const h = Math.abs(laserItem.y - (y + y1) * 0.5);
      laserLengthStyle.height = `${(h + extra) * GRID_SIZE}vw`;
    } else {
      const w = Math.abs(laserItem.x - (x + x1) * 0.5);
      laserLengthStyle.width = `${(w + extra) * GRID_SIZE}vw`;
    }
  } else if (laserTarget) {
    const extra = 0.2;
    const { x, y } = (laserTarget as Robot).position;
    if (["up", "down"].includes(laserItem.direction)) {
      const h = Math.abs(laserItem.y - y);
      laserLengthStyle.height = `${(h + extra) * GRID_SIZE}vw`;
    } else {
      const w = Math.abs(laserItem.x - x);
      laserLengthStyle.width = `${(w + extra) * GRID_SIZE}vw`;
    }
  }

  return (
    <StyledLaser>
      <LaserBeam
        isShooting={isShooting}
        style={{
          ...laserStyle[laserItem.direction],
          ...laserLengthStyle,
        }}
      />
      <LaserGun
        style={{
          ...laserStyle[laserItem.direction],
        }}
      />
    </StyledLaser>
  );
}

export const getLaserToolTip = (cellItems: MapItemNoId[]) => {
  if (cellItems.find((a) => a.type === "laser")) {
    return "Map lasers will fire at the end of each register, before robot lasers. If you can move through the path of the laser before it fires, you can avoid being shot.";
  }

  return null;
};
