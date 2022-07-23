import React from "react";
import styled, { css, keyframes } from "styled-components";

import type { Robot } from "dist-common/game-types";
import { positionToOffsets } from "../utils";
import { useOptions } from "../../../hooks/options-context";

import getBorderStyle from "./get-border-style";

interface RobotProps {
  name?: string;
  robot: Robot;
  isPlayer: boolean;
}

const bounceAnimation = keyframes`
0% {
  bottom: 0.2vw;
}

50% {
  bottom: -0.2vw;
}

100% {
  bottom: 0.2vw;
}
`;

const bounceAnimationMixin = css`
  animation: ${bounceAnimation} 1s linear infinite;
`;

const fallAnimation = keyframes`
0% {
  transform: rotate(0turn);
}

100% {
  transform: rotate(1turn);
}
`;

const fallAnimationMixin = css`
  animation: ${fallAnimation} 1s linear infinite;
`;

const ToolTip = styled.div`
  pointer-events: none;
  display: none;
  position: absolute;
  z-index: 15;

  div {
    position: absolute;
    left: 2.5vw;
    padding: 0.25em;
    background-color: #2f2f2f;
  }
`;

const RobotDiv = styled.div``;

export const StyledRobot = styled.div<{
  isPlayer?: boolean;
  isFalling?: boolean;
  isDestroyed?: boolean;
}>`
  pointer-events: ${({ isDestroyed }) => (isDestroyed ? "none" : "auto")};
  z-index: ${({ isDestroyed }) => (isDestroyed ? "5" : "10")};
  opacity: ${({ isDestroyed }) => (isDestroyed ? "0.2" : "1")};
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  border-width: 0.25vw;
  border-radius: 0vw;
  width: 2vw;
  height: 2vw;
  background-color: #2f2f2f;

  transition: 450ms ease-in-out;

  & > ${RobotDiv} {
    pointer-events: none;
    ${({ isFalling }) => (isFalling ? fallAnimationMixin : "")}
    transition: 450ms ease-in-out;
    position: absolute;
    z-index: ${({ isDestroyed }) => (isDestroyed ? "5" : "10")};
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  img {
    ${({ isPlayer, isFalling }) =>
      isPlayer && !isFalling ? bounceAnimationMixin : ""}
    font-size: 1.1vw;
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
    width: 90%;
    height: 90%;
  }

  &:hover {
    opacity: 0.2;
  }

  &:hover + ${ToolTip} {
    display: block;
    opacity: 1;
  }
`;

const facingMap = {
  up: "0turn",
  right: "0.25turn",
  down: "0.5turn",
  left: "0.75turn",
};

export default function Robot({ name, robot, isPlayer }: RobotProps) {
  const { position, design, status, damagePoints } = robot;

  const {
    options: { colors },
  } = useOptions();

  const offsets = positionToOffsets(position);

  const style = getBorderStyle(design, colors);

  const isDestroyed = damagePoints >= 10;

  return (
    <div>
      <StyledRobot
        isPlayer={isPlayer}
        isFalling={status === "falling"}
        isDestroyed={isDestroyed}
        style={{
          ...style,
          top: offsets.y,
          left: offsets.x,
        }}
      >
        <RobotDiv
          style={{ transform: `rotate(${facingMap[position.facing]})` }}
        >
          <img src="/robot-triangle.svg" />
        </RobotDiv>
      </StyledRobot>
      <ToolTip style={{ top: offsets.y, left: offsets.x }}>
        <div style={style}>{name}</div>
      </ToolTip>
    </div>
  );
}
