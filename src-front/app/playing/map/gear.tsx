import React from "react";
import styled, { keyframes, css } from "styled-components";

import type { GearMapItem, MapItemNoId } from "dist-common/game-types";

const ANIMATION_DURATION = "8s";

const cwAnimation = keyframes`
0% {
  transform: rotate(0turn);
}

100% {
  transform: rotate(1turn);
}
`;

const cwAnimationMixin = css`
  animation: ${cwAnimation} ${ANIMATION_DURATION} linear infinite;
`;

const ccwAnimation = keyframes`
0% {
  transform: rotate(1turn);
}

100% {
  transform: rotate(0turn);
}
`;

const ccwAnimationMixin = css`
  animation: ${ccwAnimation} ${ANIMATION_DURATION} linear infinite;
`;

const StyledGear = styled.div<{ isCw: boolean }>`
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

  ${({ isCw }) => (isCw ? cwAnimationMixin : ccwAnimationMixin)}
`;

interface GearProps {
  cellItems: MapItemNoId[];
}

export default function Gear({ cellItems }: GearProps) {
  const GearItem = cellItems.find((ci) => ci.type === "gear") as
    | GearMapItem
    | undefined;

  if (!GearItem) {
    return null;
  }

  const { direction } = GearItem;

  const imageUrl = `/gear-${direction === "clockwise" ? "cw" : "ccw"}.png`;

  return (
    <StyledGear
      isCw={direction === "clockwise"}
      style={{
        backgroundImage: `url("${imageUrl}")`,
        backgroundSize: "contain",
        opacity: direction === "clockwise" ? 0.4 : 0.6,
      }}
    />
  );
}

export const getGearToolTip = (cellItems: MapItemNoId[]) => {
  if (cellItems.find((a) => a.type === "gear")) {
    return "Gears will rotate your robot by 90 degrees if they end a program register on them.";
  }

  return null;
};
