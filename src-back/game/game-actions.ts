import { randomUUID } from "crypto";
import {
  GameAction,
  ChooseCardAction,
  FingerOnNoseAction,
} from "../../dist-common/game-action-types";
import {
  PlayerSecrets,
  ProgramCard,
  MainGameState,
} from "../../dist-common/game-types";
import Game from "./game-class";
import { shuffle } from "./utils";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const startGame = (
  game: Game,
  action: GameAction
): { game: Game; message: string } => {
  const { gameState, gameSettings, playerSecrets, players, host } = game;
  if (gameState.state !== "lobby") {
    return {
      game,
      message: "Game is already in progress.",
    };
  }

  if (action.playerId !== host) {
    return {
      game,
      message: "Only the host can start the game.",
    };
  }

  const playerIds = players.map((a) => a.id);
  const seatOrder = shuffle(playerIds);

  const cardMap: { [cardId: string]: ProgramCard } = {};
  let deck: string[] = [];

  const shuffledDeck = shuffle(deck);

  playerIds.forEach((playerId) => {
    const cardsInHand: string[] = [];
    for (let n = 0; n < gameSettings.cardsPerPlayer; n++) {
      cardsInHand.push(shuffledDeck.pop() as string);
    }

    playerSecrets[playerId].cardsInHand = cardsInHand;
  });

  game.gameState = {
    ...game.gameState,
    state: "main",
    seatOrder,
    cardMap,
  } as MainGameState;

  game.gameSecrets.remainingDeck = [...deck];

  return {
    game,
    message: "OK",
  };
};

const chooseCard = (
  game: Game,
  action: ChooseCardAction
): { game: Game; message: string } => {
  const { gameState, playerSecrets, players } = game;
  if (gameState.state !== "main") {
    return {
      game,
      message: "You can't do that right now.",
    };
  }

  return {
    game,
    message: "OK",
  };
};

const fingerOnNose = (
  game: Game,
  action: FingerOnNoseAction
): { game: Game; message: string } => {
  const { gameState, playerSecrets, players } = game;
  if (gameState.state !== "main") {
    return {
      game,
      message: "You can't do that right now.",
    };
  }

  return {
    game,
    message: "OK",
  };
};

/**
 * If performAction gets called, the game has already verified the player's identity
 */
export const performAction = (
  game: Game,
  action: GameAction
): { game: Game; message: string } => {
  switch (action.type) {
    case "start":
      return startGame(game, action);
    case "choose-card":
      return chooseCard(game, action);
    case "finger-on-nose":
      return fingerOnNose(game, action);
    default:
      return { game, message: "OK" };
  }
};
