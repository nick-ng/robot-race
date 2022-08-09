import React from "react";
import styled from "styled-components";

import {
  PlayerGameData,
  PlayerDetails,
  MainGameState,
} from "dist-common/game-types";
import { getRespawnOrder } from "dist-common/utils";
import canSpawnRobotValidator from "dist-common/action-validators/can-spawn-robot";

import TimerBar, { TimerContainer } from "./timer-bar";

const StyledRespawnMessage = styled.div``;

interface RespawnMessageProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
}

export default function RespawnMessage({
  gameData,
  playerDetails,
}: RespawnMessageProps) {
  const { gameSettings, gameState, players } = gameData;
  const { robots, seatOrder } = gameState as MainGameState;

  const showTimer = gameSettings.timerStart !== "never";
  const respawnOrder = getRespawnOrder(robots, seatOrder);

  if (respawnOrder.length === 0) {
    return null;
  }

  const canSpawnRobot = canSpawnRobotValidator(
    playerDetails.playerId,
    robots,
    seatOrder
  ).canPerform;

  return (
    <StyledRespawnMessage>
      {showTimer && (
        <TimerContainer fullHeight={respawnOrder[0] === playerDetails.playerId}>
          <TimerBar
            timerDuration={gameSettings.timerSeconds * 3}
            showText={canSpawnRobot}
            key={respawnOrder[0]}
          />
        </TimerContainer>
      )}
      {canSpawnRobot && (
        <>
          <p>Choose which direction your robot should face when it respawns.</p>
          <p>
            If your archive marker is already occupied, choose where to place
            your robot first.
          </p>
          <p>
            Robots respawn with 2 damage. You can choose to have your robot
            repair itself this turn. If your robot is repairing itself, it
            cannot be programmed.
          </p>
        </>
      )}
      {respawnOrder[0] !== playerDetails.playerId && (
        <p>
          Waiting for {players.find((p) => p.id === respawnOrder[0])?.name} to
          place their robot.
        </p>
      )}
    </StyledRespawnMessage>
  );
}
