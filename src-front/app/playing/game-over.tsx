import React from "react";
import styled from "styled-components";

import type { PlayerGameData, PlayerDetails } from "dist-common/game-types";

interface GameOverProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
}

const StyledGameOver = styled.div``;

const Heading = styled.h1`
  margin-top: 0;
`;

export default function GameOver({ gameData, playerDetails }: GameOverProps) {
  const { gameState, players, gameSettings } = gameData;
  const { playerId } = playerDetails;

  if (gameState.state !== "over") {
    return <div>Something went wrong</div>;
  }

  const { flagsTouched } = gameState;

  let winnerId: string | null = null;
  for (const entry of Object.entries(flagsTouched)) {
    const [playerId, n] = entry;

    if (
      n === gameSettings.map.items.filter((mi) => mi.type === "flag").length
    ) {
      winnerId = playerId;
      break;
    }
  }

  const winnerIsYou = winnerId === playerId;
  const winner = players.find((p) => p.id === winnerId);

  return (
    <StyledGameOver>
      <Heading>Robot Race</Heading>
      <h2>{winnerIsYou ? "🏆You Won!🏆" : `${winner?.name} won`}</h2>
    </StyledGameOver>
  );
}
