import React from "react";
import styled from "styled-components";

import type {
  CurvedConveyorMapItem,
  MapItemNoId,
} from "dist-common/game-types";

const StyledCurvedConveyor = styled.div`
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

const clockwiseMap = {
  direction: "fromDirection",
  up: "right",
  right: "down",
  down: "left",
  left: "up",
} as const;

const counterClockwiseMap = {
  direction: "fromDirection",
  up: "left",
  right: "up",
  down: "right",
  left: "down",
} as const;

const oppositeMap = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
} as const;

interface CurvedConveyorProps {
  cellItems: MapItemNoId[];
}

export default function CurvedConveyor({ cellItems }: CurvedConveyorProps) {
  const curvedConveyorItem = cellItems.find(
    (ci) => ci.type === "curved-conveyor"
  ) as CurvedConveyorMapItem | undefined;

  if (!curvedConveyorItem) {
    return null;
  }

  const { fromDirection, direction, speed, showStraignt } = curvedConveyorItem;

  const isCounterClockwise = fromDirection.includes(
    counterClockwiseMap[direction]
  );
  const isClockwise = fromDirection.includes(clockwiseMap[direction]);

  const isStraight =
    showStraignt || fromDirection.includes(oppositeMap[direction]);

  const imageUrl = [
    "/conveyor-",
    speed === 2 ? 2 : 1,
    "-",
    isStraight ? "d" : "",
    isCounterClockwise ? "l" : "",
    isClockwise ? "r" : "",
    ".png",
  ].join("");

  return (
    <StyledCurvedConveyor
      style={{
        transform: `rotate(${facingMap[direction]})`,
        backgroundImage: `url("${imageUrl}")`,
        backgroundSize: "contain",
      }}
    />
  );
}

export const getCurvedConveyorToolTip = (cellItems: MapItemNoId[]) => {
  if (cellItems.find((a) => a.type === "curved-conveyor")) {
    return "Conveyors will move your robot 1 square after each program register. Express conveyors will move your robot 2 squares instead. When a robot is pushed onto a curved conveyor by another conveyor, your robot will be rotated.";
  }

  return null;
};
