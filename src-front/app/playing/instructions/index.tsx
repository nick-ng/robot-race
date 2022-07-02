import React from "react";
import styled from "styled-components";

import {
  MainGameState,
  PlayerDetails,
  PlayerGameData,
} from "dist-common/game-types";

import { useOptions } from "../../../hooks/options-context";

import SetProgramRegistersInstruction from "./set-program-registers-instruction";
import FinishedProgrammingInstruction from "./finished-programming-instruction";
import TouchFlagsInstruction from "./touch-flags-instruction";
import RespawnRobotInstruction from "./respawn-robot-instruction";

interface InstructionProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
  className?: string;
}

const StyledInstructions = styled.details``;

export default function Instructions({
  gameData,
  playerDetails,
  className,
}: InstructionProps) {
  const { gameState, gameSettings, yourSecrets } = gameData;
  const { map } = gameSettings;
  const { finishedProgrammingPlayers, flagsTouched, robots } =
    gameState as MainGameState;
  const { programRegisters } = yourSecrets;
  const { options } = useOptions();

  const startHidden =
    localStorage.getItem("ROBOT_RACE_INSTRUCTIONS_HIDDEN") === "true";

  const robot = robots.find((r) => r.playerId === playerDetails.playerId);
  const archiveMarker = map.items.find(
    (mi) => mi.id === robot?.archiveMarkerId
  )!;

  const isRobotOnField =
    robot && robot.status === "ok" && robot.damagePoints < 10;

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
      {isRobotOnField &&
        programRegisters.filter((a) => a !== null).length < 5 && (
          <SetProgramRegistersInstruction
            smallerPriorityFirst={options.smallerPriorityFirst}
          />
        )}
      {isRobotOnField &&
        !finishedProgrammingPlayers.includes(playerDetails.playerId) && (
          <FinishedProgrammingInstruction />
        )}
      {isRobotOnField && (
        <TouchFlagsInstruction
          nextFlag={flagsTouched[playerDetails.playerId] + 1}
        />
      )}
      {!isRobotOnField && (
        <RespawnRobotInstruction
          isBlocked={Boolean(
            robots.find(
              (r) =>
                r.status === "ok" &&
                r.position.x === archiveMarker.x &&
                r.position.y === archiveMarker.y
            )
          )}
        />
      )}
    </StyledInstructions>
  );
}
