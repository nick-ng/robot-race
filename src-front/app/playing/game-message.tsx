import React from "react";
import styled from "styled-components";

import {
  PlayerGameData,
  PlayerDetails,
  MainGameState,
} from "dist-common/game-types";
import canSpawnRobot from "dist-common/action-validators/can-spawn-robot";

const StyledGameMessage = styled.div``;

interface GameMessageProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
}

export default function GameMessage({
  gameData,
  playerDetails,
}: GameMessageProps) {
  const { gameState, players } = gameData;
  const { robots, seatOrder } = gameState as MainGameState;

  const nextPlayerToSpawn = seatOrder.find((playerId) =>
    robots.find((r) => r.status === "stand-by" && r.playerId === playerId)
  );

  return (
    <StyledGameMessage>
      {canSpawnRobot(playerDetails.playerId, robots, seatOrder).canPerform && (
        <p>Place your robot and choose their facing.</p>
      )}
      {nextPlayerToSpawn && nextPlayerToSpawn !== playerDetails.playerId && (
        <p>
          Waiting for {players.find((p) => p.id === nextPlayerToSpawn)?.name} to
          place their robot.
        </p>
      )}
    </StyledGameMessage>
  );
}
