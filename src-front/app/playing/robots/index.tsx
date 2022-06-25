import React from "react";
import styled from "styled-components";

import {
  MainGameState,
  PlayerDetails,
  PlayerGameData,
} from "../../../../dist-common/game-types";

import Robot from "./robot";

interface RobotsProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
}

export default function Robots({ gameData }: RobotsProps) {
  const { gameState, players } = gameData;
  const { seatOrder } = gameState as MainGameState;

  return (
    <>
      {seatOrder.map((playerId) => (
        <Robot
          key={playerId}
          player={players.find((a) => a.id === playerId)!}
          xOrd={11}
          yOrd={12}
        />
      ))}
    </>
  );
}
