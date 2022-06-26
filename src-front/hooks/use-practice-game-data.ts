import { useState, useEffect } from "react";

import {
  ActionIncomingMessageObject,
  AutomaticAction,
} from "../../dist-common/game-action-types";
import { GameData, PlayerGameData } from "../../dist-common/game-types";

import { getPlayerData } from "./utils";
import { getDefaultGameData } from "./default-game-data";

declare const API_ORIGIN: string;

export const usePracticeGameData = (
  playerId: string
): {
  gameData: PlayerGameData;
  fullGameData: GameData;
  sendViaWebSocket: (messageObject: ActionIncomingMessageObject) => void;
} => {
  const [gameData, setGameData] = useState<GameData>(getDefaultGameData());

  const sendViaWebSocket = (
    messageObject: ActionIncomingMessageObject,
    newerGameData?: GameData
  ) => {
    const { action } = messageObject;
    setTimeout(async () => {
      const res = await fetch(`${API_ORIGIN}/api/game/advance-game-state`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          gameData: newerGameData || gameData,
          action,
        }),
      });

      const { gameData: newGameData, automaticAction } = (await res.json()) as {
        gameData: GameData;
        automaticAction?: AutomaticAction;
      };

      setGameData(newGameData);

      if (automaticAction) {
        setTimeout(() => {
          sendViaWebSocket(
            {
              playerId: "server",
              password: newGameData.gameSecrets.password,
              gameId: newGameData.id,
              type: "action",
              action: automaticAction.action,
            },
            newGameData
          );
        }, automaticAction.delay);
      }
    }, 1);
  };

  useEffect(() => {
    sendViaWebSocket({
      playerId: "server",
      password: gameData.gameSecrets.password,
      gameId: gameData.id,
      type: "action",
      action: {
        playerId: "server",
        type: "deal-program-cards",
      },
    });
  }, []);

  return {
    gameData: getPlayerData(gameData, playerId),
    fullGameData: gameData,
    sendViaWebSocket,
  };
};
