import React from "react";
import styled from "styled-components";

import {
  PlayerGameData,
  PlayerDetails,
  MainGameState,
} from "dist-common/game-types";
import { getRespawnOrder } from "dist-common/utils";
import canSpawnRobot from "dist-common/action-validators/can-spawn-robot";

const StyledRespawnMessage = styled.div``;

interface RespawnMessageProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
}

export default function RespawnMessage({
  gameData,
  playerDetails,
}: RespawnMessageProps) {
  const { gameState, players } = gameData;
  const { robots, seatOrder } = gameState as MainGameState;

  const respawnOrder = getRespawnOrder(robots, seatOrder);

  if (respawnOrder.length === 0) {
    return null;
  }

  return (
    <StyledRespawnMessage>
      {canSpawnRobot(playerDetails.playerId, robots, seatOrder).canPerform && (
        <p>Place your robot and choose their facing.</p>
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
