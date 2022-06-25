import React from "react";
import styled from "styled-components";

import {
  MainGameState,
  PlayerDetails,
  PlayerGameData,
} from "../../../dist-common/game-types";

interface PlayerDisplayProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
}

const StyledPlayerDisplay = styled.div`
  margin: 0 0.5em;
`;

const Player = styled.div``;

export default function PlayerDisplay({
  gameData,
  playerDetails,
}: PlayerDisplayProps) {
  const { gameState, players } = gameData;
  const { seatOrder, finishedProgrammingPlayers } = gameState as MainGameState;
  return (
    <StyledPlayerDisplay>
      {seatOrder.map((playerId) => {
        const player = players.find(
          (player) => player.id === playerDetails.playerId
        )!;
        return (
          <Player key={playerId}>
            {finishedProgrammingPlayers.includes(player.id) ? "🙂" : "🤔"}{" "}
            {player.name}
          </Player>
        );
      })}
    </StyledPlayerDisplay>
  );
}
