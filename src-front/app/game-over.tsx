import React from "react";
import styled from "styled-components";

import { PlayerGameData, PlayerDetails } from "../../dist-common/game-types";

interface GameOverProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
}

const StyledGameOver = styled.div``;

export default function GameOver({ gameData, playerDetails }: GameOverProps) {
  const { gameState, players } = gameData;
  const { playerId } = playerDetails;

  if (gameState.state !== "over") {
    return <div>Something went wrong</div>;
  }

  const { fingerOnNose } = gameState;

  const losers = players.filter((player) => !fingerOnNose.includes(player.id));

  if (losers.length !== 1) {
    return <div>Something went wrong</div>;
  }

  const loser = losers[0];

  const loserIsYou = loser.id === playerId;

  return (
    <StyledGameOver>
      <h2>{loserIsYou ? "You have lost." : `${loser.name} has lost.`}</h2>
    </StyledGameOver>
  );
}
