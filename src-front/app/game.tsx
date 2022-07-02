import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { PlayerDetails } from "dist-common/game-types";

import { useGameSocket } from "../hooks/use-game-socket";
import { useOptions } from "../hooks/options-context";
import Loading from "../loading";
import Lobby from "./lobby";
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
  const { setOptions } = useOptions();

  useEffect(() => {
    setOptions({ ping: roundTripTime });
  }, [roundTripTime]);

  if (typeof gameData === "undefined") {
    return <Loading />;
  }

  const { gameState } = gameData;

  switch (gameState.state) {
    case "lobby":
      return <Lobby gameData={gameData} playerDetails={playerDetails} />;
    case "over":
    default:
      return (
        <Playing
          gameData={gameData}
          playerDetails={playerDetails}
          sendViaWebSocket={sendViaWebSocket}
        />
      );
  }
}
