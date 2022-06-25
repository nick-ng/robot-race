import React from "react";
import styled from "styled-components";

import { Player, Robot } from "../../../../dist-common/game-types";
import { positionToOffsets } from "../utils";

interface RobotProps {
  player: Player;
  robot: Robot;
}

const StyledRobot = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  border-width: 5px;
  border-radius: 0vw;
  width: 2vw;
  height: 2vw;

  transition: 450ms ease-in-out;

  span {
    font-size: 1.1vw;
    transition: 450ms ease-in-out;
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

  let style = {};

  switch (design) {
    case "dotted":
    case "dashed":
    case "double":
    case "ridge":
    case "outset":
      style = {
        borderStyle: design,
        borderColor: "white",
      };
      break;
    case "white":
    case "black":
      style = {
        borderStyle: "solid",
        borderColor: design,
      };
      break;
    default:
      style = {
        borderStyle: "gainsboro",
        borderColor: design,
      };
  }

  return (
    <StyledRobot
      style={{
        ...style,
        top: offsets.y,
        left: offsets.x,
      }}
    >
      <span style={{ rotate: facingMap[position.facing] }}>🤖</span>
    </StyledRobot>
  );
}
