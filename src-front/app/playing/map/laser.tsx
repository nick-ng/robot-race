import React from "react";
import styled from "styled-components";

import type {
  LaserMapItem,
  MapItemNoId,
  Robot,
  Position,
  WallMapItem,
} from "dist-common/game-types";

import {
  directionMap,
  getLaserTarget,
} from "../../../../dist-common/get-laser-target";

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

const LaserBeam = styled.div<{ isShooting: true }>`
  border: 2px ${({ isShooting }) => (isShooting ? "solid" : "dashed")} #ff0000;
`;

interface LaserProps {
  cellItems: MapItemNoId[];
  allItems: MapItemNoId[];
  robots: Robot[];
}

export default function Laser({ cellItems, allItems, robots }: LaserProps) {
  const laserItem = cellItems.find((ci) => ci.type === "laser") as
    | LaserMapItem
    | undefined;

  if (!laserItem) {
    return null;
  }

  const { xd, yd } = directionMap[laserItem.direction];

  const position: Position = {
    x: laserItem.x,
    y: laserItem.y,
    facing: laserItem.direction,
  };

  const laserTarget = getLaserTarget(position, robots, allItems, true);
  console.log("laserTarget", laserTarget);

  let laserLength = 0;

  if ((laserTarget as WallMapItem | null)?.type === "wall") {
    const x0 =
      ((laserTarget as WallMapItem).x + (laserTarget as WallMapItem).x1) * 0.5;
    const y0 =
      ((laserTarget as WallMapItem).y + (laserTarget as WallMapItem).y1) * 0.5;

    laserLength = Math.abs(laserItem.x - x0) + Math.abs(laserItem.y - y0);
  } else if (laserTarget) {
    laserLength =
      Math.abs(laserItem.x - (laserTarget as Robot).position.x) +
      Math.abs(laserItem.y - (laserTarget as Robot).position.y);
  }

  return (
    <StyledLaser>
      Laser {laserItem.direction} {laserItem.count} {laserLength}
      <LaserBeam isShooting={true} style={{}} />
    </StyledLaser>
  );
}

export const getLaserToolTip = (cellItems: MapItemNoId[]) => {
  if (cellItems.find((a) => a.type === "laser")) {
    return "Map lasers will fire at the end of each register, before robot lasers. If you can move through the path of the laser before it fires, you can avoid being shot.";
  }

  return null;
};
