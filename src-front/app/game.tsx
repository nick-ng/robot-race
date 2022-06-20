import React from "react";
import { useParams } from "react-router-dom";

import { PlayerDetails } from "../../dist-common/game-types";

import { useGameSocket } from "../hooks/use-game-socket";
import Loading from "../loading";
import PingDisplay from "./ping-display";
import Lobby from "./lobby";
import GameOver from "./game-over";
import Playing from "./playing";

interface GameProps {
  playerDetails: PlayerDetails;
}

export default function Game({ playerDetails }: GameProps) {
  const { gameId } = useParams();
  const { gameData, roundTripTime, sendViaWebSocket } = useGameSocket(
    gameId!,
    playerDetails
  );

  if (typeof gameData === "undefined") {
    return <Loading />;
  }

  const { gameState } = gameData;

  switch (gameState.state) {
    case "lobby":
      return (
        <>
          <Lobby gameData={gameData} playerDetails={playerDetails} />
          <PingDisplay roundTripTime={roundTripTime} />
        </>
      );
    case "over":
      return <GameOver gameData={gameData} playerDetails={playerDetails} />;
    default:
      return (
        <>
          <Playing
            gameData={gameData}
            playerDetails={playerDetails}
            sendViaWebSocket={sendViaWebSocket}
          />
          <PingDisplay roundTripTime={roundTripTime} />
        </>
      );
  }
}
