import React from "react";
import styled from "styled-components";

import type { LaserMapItem, MapItemNoId } from "dist-common/game-types";

import { getLaserTarget } from "../../../../dist-common/get-laser-target";

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
}

export default function Laser({ cellItems, allItems }: LaserProps) {
  const laserItem = cellItems.find((ci) => ci.type === "laser") as
    | LaserMapItem
    | undefined;

  if (!laserItem) {
    return null;
  }

  return (
    <StyledLaser>
      Laser {laserItem.direction} {laserItem.count}
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
