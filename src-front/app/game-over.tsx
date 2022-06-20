import React from "react";
import styled from "styled-components";

import { PlayerGameData, PlayerDetails } from "../../dist-common/game-types";

interface GameOverProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
}

const Container = styled.div``;

export default function GameOver({ gameData, playerDetails }: GameOverProps) {
  const { gameState, players, gameSettings } = gameData;
  const { playerId } = playerDetails;

  if (gameState.state !== "over") {
    return <Container>Something went wrong</Container>;
  }

  const { fingerOnNose } = gameState;

  const losers = players.filter((player) => !fingerOnNose.includes(player.id));

  if (losers.length !== 1) {
    return <Container>Something went wrong</Container>;
  }

  const loser = losers[0];

  const loserIsYou = loser.id === playerId;

  return (
    <Container>
      <h2>{loserIsYou ? "You have lost." : `${loser.name} has lost.`}</h2>
    </Container>
  );
}
