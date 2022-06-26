import React from "react";
import styled from "styled-components";

import {
  MainGameState,
  PlayerDetails,
  PlayerGameData,
} from "../../../dist-common/game-types";
import { getFlagEmoji } from "../utils";
import getBorderStyle from "./robots/get-border-style";

interface PlayerDisplayProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
}

const StyledPlayerDisplay = styled.div`
  margin: 0 0.5em;
`;

const Player = styled.div`
  padding: 0.2em;
  border-width: 0.25vw;
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

const Emoji = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export default function PlayerDisplay({ gameData }: PlayerDisplayProps) {
  const { gameState, players } = gameData;
  const { seatOrder, finishedProgrammingPlayers, robots, flagsTouched } =
    gameState as MainGameState;
  return (
    <StyledPlayerDisplay>
      {seatOrder.map((playerId) => {
        const player = players.find((player) => player.id === playerId)!;
        const robot = robots.find((robot) => robot.playerId === playerId);
        const style = getBorderStyle(robot?.design || "");
        return (
          <Player key={playerId} style={style}>
            <Emoji>
              {finishedProgrammingPlayers.includes(playerId) ? "💡" : "💭"}{" "}
            </Emoji>
            <div>
              <div>{player.name}</div>
              <div>
                Next: {getFlagEmoji()}
                {flagsTouched[playerId]}
              </div>
            </div>
          </Player>
        );
      })}
    </StyledPlayerDisplay>
  );
}
