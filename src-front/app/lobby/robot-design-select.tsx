import React from "react";
import styled, { css } from "styled-components";

import type {
  PlayerGameData,
  PlayerDetails,
  Robot,
} from "dist-common/game-types";

import { ROBOT_DESIGNS } from "../playing/robots/get-border-style";
import { RobotWithDesign } from "../home/robot-colors";

declare const API_ORIGIN: string;

const StyledRobotDesignSelect = styled.div``;

export const Robots = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 0.5em;
  justify-content: center;
`;

const RobotContainer = styled.div`
  background-color: #2f2f2f;
  padding: 2px;
`;

const chosenCss = css`
  background-color: #000000;
  color: #ffffff;
  border-style: solid;
  border-color: black;

  &:active {
    border-style: solid;
  }
`;

const disabledCss = css`
  cursor: not-allowed;

  &:active {
    border-style: outset;
  }
`;

const Button = styled.button<{ isChosen?: boolean }>`
  ${({ isChosen }) => (isChosen ? chosenCss : "")}
  ${({ disabled }) => (disabled ? disabledCss : "")}
  padding: 3px;
  font-size: 18pt;
`;

type ChooseRobotDesignParams = {
  newRobotDesign: Robot["design"];
  gameId: string;
  playerDetails: PlayerDetails;
};
const chooseRobotDesign = ({
  newRobotDesign,
  gameId,
  playerDetails,
}: ChooseRobotDesignParams) => {
  fetch(`${API_ORIGIN}/api/game/${gameId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "x-player-id": playerDetails.playerId,
      "x-player-password": playerDetails.playerPassword,
    },
    body: JSON.stringify({
      action: "change-robot-design",
      newRobotDesign,
    }),
  });
};

interface RobotDesignSelectProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
}

export default function RobotDesignSelect({
  gameData,
  playerDetails,
}: RobotDesignSelectProps) {
  const { gameState } = gameData;
  const { robots } = gameState;
  const robot = robots.find((r) => r.playerId === playerDetails.playerId);
  const otherRobotDesigns = robots
    .filter((r) => r.playerId !== playerDetails.playerId)
    .map((r) => r.design);

  if (!robot) {
    return null;
  }

  return (
    <StyledRobotDesignSelect>
      <Robots>
        <Button
          isChosen={"random" === robot.design}
          onClick={() => {
            chooseRobotDesign({
              newRobotDesign: "random",
              gameId: gameData.id,
              playerDetails,
            });
          }}
        >
          ?
        </Button>
        {ROBOT_DESIGNS.map((design) => (
          <Button
            key={`design-button-${design}`}
            isChosen={design === robot.design}
            disabled={otherRobotDesigns.includes(design)}
            onClick={() => {
              chooseRobotDesign({
                newRobotDesign: design,
                gameId: gameData.id,
                playerDetails,
              });
            }}
          >
            <RobotContainer>
              <RobotWithDesign design={design} />
            </RobotContainer>
          </Button>
        ))}
      </Robots>
    </StyledRobotDesignSelect>
  );
}
