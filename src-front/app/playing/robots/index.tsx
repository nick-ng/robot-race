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
  const { seatOrder, robots } = gameState as MainGameState;

  return (
    <>
      {robots.map((robot) => (
        <Robot
          key={robot.playerId}
          player={players.find((a) => a.id === robot.playerId)!}
          robot={robot}
        />
      ))}
    </>
  );
}
