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

  opacity: 0.3;
`;

const facingMap = {
  up: "0turn",
  right: "0.25turn",
  down: "0.5turn",
  left: "0.75turn",
} as const;

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

  let imageUrl = "/conveyor-1.png";

  switch (straightConveyorItem.speed) {
    case 2:
      imageUrl = "/conveyor-2.png";
      break;
    default:
      imageUrl = "/conveyor-1.png";
  }

  return (
    <StyledStraightConveyor
      style={{
        transform: `rotate(${facingMap[straightConveyorItem.direction]})`,
        backgroundImage: `url("${imageUrl}")`,
        backgroundSize: "contain",
      }}
    />
  );
}

export const getStraightConveyorToolTip = (cellItems: MapItemNoId[]) => {
  if (cellItems.find((a) => a.type === "straight-conveyor")) {
    return "Conveyors will move your robot 1 square after each program register. Express conveyors will move your robot 2 squares instead.";
  }

  return null;
};
