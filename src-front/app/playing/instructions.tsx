import React, { useState } from "react";
import styled from "styled-components";

import {
  MainGameState,
  PlayerDetails,
  PlayerGameData,
} from "../../../dist-common/game-types";

interface InstructionProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
}

const StyledInstructions = styled.details`
  summary {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default function Instructions({
  gameData,
  playerDetails,
}: InstructionProps) {
  const { gameState } = gameData;
  const { state } = gameState as MainGameState;

  const [isOpen, _setIsOpen] = useState(
    (): boolean =>
      localStorage.getItem("ROBOT_RACE_INSTRUCTIONS_OPEN") === "true" || false
  );

  return (
    <StyledInstructions
      open={isOpen}
      onClick={() => {
        localStorage.setItem(
          "ROBOT_RACE_INSTRUCTIONS_OPEN",
          (!isOpen).toString()
        );
      }}
    >
      <summary>Instructions</summary>
      <p>Detailed instructions based on what you can do go here.</p>
      <p>It's the {state} phase of the game.</p>
      <p>Your player ID is {playerDetails.playerId}</p>
    </StyledInstructions>
  );
}
