import React from "react";
import styled from "styled-components";

import { Player } from "../../../../dist-common/game-types";

interface RobotProps {
  player: Player;
  xOrd: number;
  yOrd: number;
}

const StyledRobot = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  border-width: 3px;
  border-radius: 1.5vw;
  width: 2vw;
  height: 2vw;

  span {
    font-size: 1.1vw;
  }
`;

export default function Robot({ player, xOrd, yOrd }: RobotProps) {
  const ratio = 2.8;
  const constant = 0.43;
  const xOffset = `${ratio * xOrd + constant}vw`;
  const yOffset = `${ratio * yOrd + constant}vw`;

  return (
    <StyledRobot
      style={{
        borderStyle: "solid",
        borderColor: "gainsboro",
        top: yOffset,
        left: xOffset,
      }}
    >
      <span>🤖</span>
    </StyledRobot>
  );
}
