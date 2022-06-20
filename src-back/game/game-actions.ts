import { randomUUID } from "crypto";
import {
  GameAction,
  ChooseCardAction,
  FingerOnNoseAction,
} from "../../dist-common/game-action-types";
import { PlayerSecrets } from "../../dist-common/game-types";
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

  const cardMap: { [cardId: string]: string } = {};
  let deck: string[] = [];

  for (let n = 0; n < players.length; n++) {
    const letter = LETTERS[n];
    for (let m = 0; m < gameSettings.cardsPerPlayer; m++) {
      const cardId = randomUUID();
      cardMap[cardId] = letter;
      deck.push(cardId);
    }
  }

  const shuffledDeck = shuffle(deck);

  playerIds.forEach((playerId) => {
    const cardsInHand: string[] = [];
    for (let n = 0; n < gameSettings.cardsPerPlayer; n++) {
      cardsInHand.push(shuffledDeck.pop() as string);
    }

    playerSecrets[playerId].chosenCard = "";
    playerSecrets[playerId].cardsInHand = cardsInHand;
  });

  game.gameState = {
    ...game.gameState,
    state: "main",
    seatOrder,
    chosenCardPlayers: [],
    fingerOnNose: [],
    cardMap,
  };

  game.gameSecrets.fullDeck = [...deck];

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

  const { playerId, cardId } = action;
  const { cardsInHand } = playerSecrets[playerId];
  const { chosenCardPlayers, seatOrder } = gameState;

  if (!cardsInHand?.includes(cardId)) {
    return {
      game,
      message: "You don't have that card.",
    };
  }

  if (playerSecrets[playerId].chosenCard === cardId) {
    return {
      game,
      message: "That's already your chosen card.",
    };
  }

  playerSecrets[playerId].chosenCard = cardId;

  const uniqueChosenCardPlayers = new Set(chosenCardPlayers);
  uniqueChosenCardPlayers.add(playerId);
  gameState.chosenCardPlayers = [...uniqueChosenCardPlayers];

  if (uniqueChosenCardPlayers.size < players.length) {
    return {
      game,
      message: "OK",
    };
  }

  gameState.chosenCardPlayers = [];

  for (let n = 0; n < seatOrder.length; n++) {
    const giverId = seatOrder[n];
    const receiverIndex = (n + 1) % seatOrder.length;
    const receiverId = seatOrder[receiverIndex] as keyof PlayerSecrets;

    const passedCard = playerSecrets[giverId].chosenCard;
    playerSecrets[giverId].chosenCard = "";
    playerSecrets[giverId].cardsInHand = playerSecrets[
      giverId
    ].cardsInHand?.filter((cardId) => cardId !== passedCard);

    playerSecrets[receiverId].cardsInHand?.push(passedCard!);
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

  const { playerId } = action;
  const { cardMap, fingerOnNose } = gameState;
  const { cardsInHand } = playerSecrets[playerId];

  if (fingerOnNose.length === players.length - 1) {
    game.gameState = {
      ...gameState,
      state: "over",
    };

    return {
      game,
      message: "OK",
    };
  }

  if (!Array.isArray(cardsInHand)) {
    return {
      game,
      message: "You don't have cards somehow.",
    };
  }

  const [firstCard, ...otherCards] = cardsInHand.map(
    (cardId) => cardMap[cardId]
  );

  if (
    fingerOnNose.length === 0 &&
    !otherCards.every((cardValue) => cardValue === firstCard)
  ) {
    return {
      game,
      message: "You can't do that right now.",
    };
  }

  fingerOnNose.push(playerId);
  playerSecrets[playerId].chosenCard = "";
  gameState.chosenCardPlayers = gameState.chosenCardPlayers.filter(
    (a) => a !== playerId
  );

  if (fingerOnNose.length === players.length - 1) {
    game.gameState = {
      ...gameState,
      state: "over",
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
