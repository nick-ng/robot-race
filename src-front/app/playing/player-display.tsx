import React from "react";
import styled from "styled-components";

import {
  MainGameState,
  PlayerDetails,
  PlayerGameData,
} from "../../../dist-common/game-types";
import getBorderStyle from "./robots/get-border-style";

interface PlayerDisplayProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
}

const StyledPlayerDisplay = styled.div`
  margin: 0 0.5em;
`;

const Player = styled.div`
  padding: 0.2em 0.5em;
  border-width: 0.25vw;
`;

export default function PlayerDisplay({ gameData }: PlayerDisplayProps) {
  const { gameState, players } = gameData;
  const { seatOrder, finishedProgrammingPlayers, robots } =
    gameState as MainGameState;
  return (
    <StyledPlayerDisplay>
      {seatOrder.map((playerId) => {
        const player = players.find((player) => player.id === playerId)!;
        const robot = robots.find((robot) => robot.playerId === playerId);
        const style = getBorderStyle(robot?.design || "");
        return (
          <Player key={playerId} style={style}>
            {finishedProgrammingPlayers.includes(player.id) ? "🙂" : "🤔"}{" "}
            {player.name}
          </Player>
        );
      })}
    </StyledPlayerDisplay>
  );
}
