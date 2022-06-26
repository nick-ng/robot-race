import React from "react";
import styled, { css, keyframes } from "styled-components";

import { Player, Robot } from "../../../../dist-common/game-types";
import { positionToOffsets } from "../utils";

import getBorderStyle from "./get-border-style";

interface RobotProps {
  player: Player;
  robot: Robot;
}

const bounceAnimation = keyframes`

0% {
  bottom: 0.3vw;
}

50% {
  bottom: -0.1vw;
}

100% {
  bottom: 0.3vw;
}
`;

const bounceAnimationMixin = css`
animation ${bounceAnimation} 1s linear infinite;
`;

const StyledRobot = styled.div<{ isPlayer?: boolean }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  border-width: 0.25vw;
  border-radius: 0vw;
  width: 2vw;
  height: 2vw;

  transition: 450ms ease-in-out;

  & > div {
    transition: 450ms ease-in-out;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  span {
    ${({ isPlayer }) => (isPlayer ? bounceAnimationMixin : "")}
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
  }
`;

const facingMap = {
  up: "0turn",
  right: "0.25turn",
  down: "0.5turn",
  left: "0.75turn",
};

export default function Robot({ player, robot }: RobotProps) {
  const { position, design } = robot;

  const offsets = positionToOffsets(position);

  const style = getBorderStyle(design);

  return (
    <StyledRobot
      isPlayer={player?.id === robot.playerId}
      style={{
        ...style,
        top: offsets.y,
        left: offsets.x,
      }}
    >
      <div style={{ transform: `rotate(${facingMap[position.facing]})` }}>
        <span>🤖</span>
      </div>
    </StyledRobot>
  );
}
