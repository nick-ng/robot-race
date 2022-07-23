import React from "react";
import styled from "styled-components";

import {
  MainGameState,
  PlayerDetails,
  PlayerGameData,
} from "dist-common/game-types";
import { getFlagEmoji } from "../utils";
import { useOptions } from "../../hooks/options-context";

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
  min-width: 10em;
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

const Emoji = styled.div`
  width: 1.5em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const WithToolRight = styled.div<{ toolTip?: string }>`
  position: relative;

  img {
    vertical-align: text-top;
    height: 1em;
  }

  &:after {
    display: none;
    position: absolute;
    left: 105%;
    top: 0;
    content: "${({ toolTip }) => toolTip}";
    width: 11em;
    background-color: #000000;
    padding: 0.5em;
    border: 1px solid #808080;
  }

  &:hover:after {
    display: block;
  }
`;

export default function PlayerDisplay({ gameData }: PlayerDisplayProps) {
  const { gameState, gameSettings, players } = gameData;
  const { map } = gameSettings;
  const { seatOrder, finishedProgrammingPlayers, robots, flagsTouched } =
    gameState as MainGameState;
  const {
    options: { colors },
  } = useOptions();

  const totalFlags = map.items.filter((mi) => mi.type === "flag").length;

  return (
    <StyledPlayerDisplay>
      {seatOrder.map((playerId) => {
        const player = players.find((player) => player.id === playerId)!;
        const robot = robots.find((robot) => robot.playerId === playerId);
        if (!robot) {
          return null;
        }

        const style = getBorderStyle(robot.design, colors);
        return (
          <Player key={playerId} style={style}>
            <Emoji>
              {finishedProgrammingPlayers.includes(playerId) ? "💡" : "💭"}{" "}
            </Emoji>
            <div>
              <div>{player.name}</div>
              <div>
                Next:{" "}
                {flagsTouched[playerId] === totalFlags
                  ? "🏆"
                  : `${getFlagEmoji()}${flagsTouched[playerId] + 1}`}
              </div>
              <WithToolRight toolTip="How much damage your robot can take ❤️ and how many lives you have left">
                ❤️ {10 - (robot?.damagePoints || 0)}/10,&nbsp;
                <img src="/robot-triangle.svg" />: {robot?.lives}
              </WithToolRight>
            </div>
          </Player>
        );
      })}
    </StyledPlayerDisplay>
  );
}
