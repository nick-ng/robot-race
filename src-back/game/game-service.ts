import { randomUUID } from "crypto";
import { GameData } from "../../dist-common/game-types";
import { GameAction } from "../../dist-common/game-action-types";
import { ActionIncomingMessageObject } from "../../dist-common/websocket-message-types";

import Game from "./game-class";
import { saveGame, findGame, makeShortId } from "./game-redis";
import { sendStartGameAction } from "./game-server";

export const newGame = async (
  playerId: string,
  playerName: string,
  playerPassword: string
) => {
  const gameId = randomUUID();
  const shortId = await makeShortId(gameId);

  const game = new Game({ host: playerId, id: gameId, shortId });
  game.addPlayer(playerId, playerName, playerPassword);

  await saveGame(game.getGameData());

  return {
    code: 200,
    gameData: game.getGameDataForPlayer(playerId, playerPassword),
  };
};

export const joinGame = async (
  gameId: string,
  playerId: string,
  playerName: string,
  playerPassword: string
) => {
  const game = await findGame(gameId);

  if (!game) {
    return { code: 404 };
  }

  const result = game.addPlayer(playerId, playerName, playerPassword);
  if (result.type !== "success") {
    return {
      code: 400,
      message: result.message,
    };
  }

  saveGame(game.getGameData());

  return {
    code: 200,
    gameData: game.getGameDataForPlayer(playerId, playerPassword),
  };
};

export const startGame = async (
  gameId: string,
  playerId: string,
  playerPassword: string
) => {
  const game = await findGame(gameId);

  if (!game) {
    return { code: 404 };
  }

  const result = game.gameAction(playerId, playerPassword, {
    type: "start",
    playerId,
  });

  if (result.type !== "success") {
    return {
      code: 400,
      message: result.message,
      gameData: game.getGameDataForPlayer(playerId, playerPassword),
    };
  }

  await saveGame(game.getGameData(), true);
  await sendStartGameAction(game.id);

  return {
    code: 200,
    message: result.message,
    gameData: game.getGameDataForPlayer(playerId, playerPassword),
  };
};

export const getGame = async (
  gameId: string,
  playerId: string,
  playerPassword: string
) => {
  const game = await findGame(gameId);

  if (!game) {
    return { code: 404 };
  }

  return {
    code: 200,
    gameData: game.getGameDataForPlayer(playerId, playerPassword),
  };
};

export const playGame = (
  game: Game,
  action: GameAction,
  performAction: (
    nextAction: ActionIncomingMessageObject
  ) => void | Promise<void>
): { game: Game; message: string } => {
  // const result = game.gameAction()

  return { game, message: "OK" };
};

export const stepGame = (gameData: GameData, action: GameAction): GameData => {
  const game = new Game(gameData);

  game.gameAction(action.playerId, action.playerId, action);

  return game.getGameData();
};
