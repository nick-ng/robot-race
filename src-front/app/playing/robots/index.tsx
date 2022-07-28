import React from "react";

import type {
  MainGameState,
  PlayerDetails,
  PlayerGameData,
} from "dist-common/game-types";

import Robot from "./robot";

interface RobotsProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
}

export default function Robots({ gameData, playerDetails }: RobotsProps) {
  const { gameState, players } = gameData;
  const { robots } = gameState as MainGameState;

  const shotsFired = robots.some((r) => r.laser);
  if (shotsFired) {
    console.log("A robot is shooting");
  }

  return (
    <>
      {robots
        .filter((robot) => robot.status !== "stand-by")
        .map((robot) => (
          <Robot
            key={robot.playerId}
            name={players.find((a) => a.id === robot.playerId)?.name}
            isPlayer={playerDetails.playerId === robot.playerId}
            robot={robot}
          />
        ))}
    </>
  );
}
