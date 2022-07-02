import React from "react";
import styled from "styled-components";

import { StraightConveyorMapItem, MapItemNoId } from "dist-common/game-types";

const StyledStraightConveyor = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface StraightConveyorProps {
  cellItems: MapItemNoId[];
}

export default function StraightConveyor({ cellItems }: StraightConveyorProps) {
  const straightConveyorItem = cellItems.find(
    (ci) => ci.type === "straight-conveyor"
  ) as StraightConveyorMapItem | undefined;

  if (!straightConveyorItem) {
    return null;
  }

  return (
    <StyledStraightConveyor>
      {straightConveyorItem.direction[0]}
      {straightConveyorItem.speed}
    </StyledStraightConveyor>
  );
}
