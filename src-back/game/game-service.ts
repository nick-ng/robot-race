import { randomUUID } from "crypto";
import type { GameData } from "../../dist-common/game-types";
import type {
  GameAction,
  ActionIncomingMessageObject,
  AutomaticAction,
} from "../../dist-common/game-action-types";

import Game from "./game-class";
import { saveGame, findGame, makeShortId, addAction } from "./game-redis";
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
  actionObject: ActionIncomingMessageObject,
  performAction: (
    nextAction: ActionIncomingMessageObject
  ) => void | Promise<void>
): {
  game: Game;
  type: string;
  message: string;
  automaticAction?: AutomaticAction;
} => {
  const { action, playerId, password } = actionObject;

  const { type, message, automaticAction } = game.gameAction(
    playerId,
    password,
    action
  );

  game.resumeAction = null;

  if (automaticAction) {
    const { action, delay } = automaticAction;
    const fullAutomaticActionObject: ActionIncomingMessageObject = {
      playerId: "server",
      password: game.gameSecrets.password,
      gameId: game.id,
      type: "action",
      action,
    };

    game.resumeAction = fullAutomaticActionObject;
    setTimeout(() => {
      performAction(fullAutomaticActionObject);
    }, Math.max(delay, 20));
  }

  return { game, type, message, automaticAction };
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

  const { message } = playGame(
    game,
    {
      playerId,
      password: playerPassword,
      gameId: gameId,
      type: "action",
      action: {
        playerId,
        type: "start",
      },
    },
    (nextAction) => {
      addAction(nextAction);
    }
  );

  if (message.toUpperCase() !== "OK") {
    return {
      code: 400,
      message,
      gameData: game.getGameDataForPlayer(playerId, playerPassword),
    };
  }

  await saveGame(game.getGameData(), true);
  await sendStartGameAction(game.id);

  return {
    code: 200,
    message,
    gameData: game.getGameDataForPlayer(playerId, playerPassword),
  };
};

export const stepGame = (
  gameData: GameData,
  action: GameAction
): { gameData: GameData; automaticAction?: AutomaticAction } => {
  const game = new Game(gameData);

  const { automaticAction } = playGame(
    game,
    {
      playerId: action.playerId,
      password: action.playerId,
      gameId: game.id,
      type: "action",
      action,
    },
    (_nextAction) => {}
  );

  return { gameData: game.getGameData(), automaticAction };
};
