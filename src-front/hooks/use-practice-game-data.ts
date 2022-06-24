import { useState, useEffect } from "react";

import { ActionIncomingMessageObject } from "../../dist-common/websocket-message-types";
import { GameData, PlayerGameData } from "../../dist-common/game-types";

import { getPlayerData } from "./utils";
import { defaultGameData, PLAYER_UUID } from "./default-game-data";

declare const API_ORIGIN: string;

export const usePracticeGameData = (
  playerId: string
): {
  gameData: PlayerGameData;
  sendViaWebSocket: (messageObject: ActionIncomingMessageObject) => void;
} => {
  const [gameData, setGameData] = useState<GameData>(defaultGameData);

  const sendViaWebSocket = (messageObject: ActionIncomingMessageObject) => {
    const { action } = messageObject;
    setTimeout(async () => {
      const res = await fetch(`${API_ORIGIN}/api/game/advance-game-state`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          gameData,
          action,
        }),
      });

      const resJson = (await res.json()) as GameData;

      resJson.playerSecrets[PLAYER_UUID].cardsInHand = [
        "card-uuid-01",
        "card-uuid-02",
        "card-uuid-03",
        "card-uuid-04",
        "card-uuid-05",
        "card-uuid-06",
        "card-uuid-07",
      ];

      setGameData(resJson);
    }, Math.random() * 500);
  };

  return {
    gameData: getPlayerData(gameData, playerId),
    sendViaWebSocket,
  };
};
