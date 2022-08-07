import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import type { PlayerDetails } from "dist-common/game-types";

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

  if (gameData === "loading") {
    return <Loading />;
  }

  if (gameData === "not-found") {
    return (
      <div>
        <h3>Game not found</h3>
        <p>
          The game may have expired or you were given the wrong game ID. Try
          re-entering the game ID on the <Link to="/">Home page</Link>
        </p>
      </div>
    );
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
