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
  border-style: solid;
  border-color: #000000;
  background-color: #000000;
  color: #ffffff;

  &:active {
    border-style: solid;
  }
`;

const disabledCss = css`
  cursor: not-allowed;

  &:active {
    border-style: outset;
  }

  ${RobotContainer} {
    transform: rotate(0.5turn);
    opacity: 0.5;
  }
`;

const Button = styled.button<{ isChosen?: boolean }>`
  ${({ isChosen }) => (isChosen ? chosenCss : "")}
  ${({ disabled }) => (disabled ? disabledCss : "")}
  padding: 3px;
  font-size: 18pt;
  font-weight: bold;

  ${RobotContainer} {
    transition: transform 450ms ease-in-out;
  }
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

  const allRobotDesigns = [...ROBOT_DESIGNS];
  allRobotDesigns.splice(ROBOT_DESIGNS.length / 2, 0, "random");

  return (
    <StyledRobotDesignSelect>
      <Robots>
        {allRobotDesigns.map((design) => (
          <Button
            key={`design-button-${design}`}
            isChosen={design === robot.design}
            disabled={design !== "random" && otherRobotDesigns.includes(design)}
            onClick={() => {
              chooseRobotDesign({
                newRobotDesign: design,
                gameId: gameData.id,
                playerDetails,
              });
            }}
          >
            {design === "random" ? (
              "?"
            ) : (
              <RobotContainer>
                <RobotWithDesign design={design} />
              </RobotContainer>
            )}
          </Button>
        ))}
      </Robots>
    </StyledRobotDesignSelect>
  );
}
