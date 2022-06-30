import React from "react";
import styled from "styled-components";

import {
  MainGameState,
  PlayerDetails,
  PlayerGameData,
} from "dist-common/game-types";

import SetProgramRegistersInstruction from "./set-program-registers-instruction";
import FinishedProgrammingInstruction from "./finished-programming-instruction";
import TouchFlagsInstruction from "./touch-flags-instruction";

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
  const { finishedProgrammingPlayers, flagsTouched } =
    gameState as MainGameState;
  const { programRegisters } = yourSecrets;

  const startHidden =
    localStorage.getItem("ROBOT_RACE_INSTRUCTIONS_HIDDEN") === "true";

  return (
    <StyledInstructions
      open={!startHidden}
      onToggle={(e) => {
        localStorage.setItem(
          "ROBOT_RACE_INSTRUCTIONS_HIDDEN",
          (!(e.target as HTMLDetailsElement).open).toString()
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
      <TouchFlagsInstruction
        nextFlag={flagsTouched[playerDetails.playerId] + 1}
      />
    </StyledInstructions>
  );
}
