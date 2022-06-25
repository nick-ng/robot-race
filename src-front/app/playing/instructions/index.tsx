import React, { useState } from "react";
import styled from "styled-components";

import {
  MainGameState,
  PlayerDetails,
  PlayerGameData,
} from "../../../../dist-common/game-types";

import SetProgramRegistersInstruction from "./set-program-registers-instruction";
import FinishedProgrammingInstruction from "./finished-programming-instruction";

interface InstructionProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
  className?: string;
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
  className,
}: InstructionProps) {
  const { gameState, yourSecrets } = gameData;
  const { finishedProgrammingPlayers } = gameState as MainGameState;
  const { programRegisters } = yourSecrets;

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
      className={className}
    >
      <summary>Instructions</summary>
      {programRegisters.filter((a) => a !== null).length < 5 && (
        <SetProgramRegistersInstruction />
      )}
      {!finishedProgrammingPlayers.includes(playerDetails.playerId) && (
        <FinishedProgrammingInstruction />
      )}
    </StyledInstructions>
  );
}
