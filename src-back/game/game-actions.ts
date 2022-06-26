import {
  GameAction,
  SetRegisterAction,
  AutomaticAction,
} from "../../dist-common/game-action-types";
import Game from "./game-class";

import startGame from "./actions/start-game";
import dealProgramCards from "./actions/deal-program-cards";
import finishSettingRegisters from "./actions/finish-setting-registers";
import processRegister from "./actions/process-register";

const setRegister = (
  game: Game,
  action: SetRegisterAction
): { game: Game; message: string } => {
  const { gameState, playerSecrets } = game;
  if (gameState.state !== "main") {
    return {
      game,
      message: "You can't do that right now.",
    };
  }

  const { playerId, cardId, registerIndex } = action;

  if (cardId && !playerSecrets[playerId].cardsInHand.includes(cardId)) {
    return {
      game,
      message: "Card must be in your hand before you can set it in a register.",
    };
  }

  playerSecrets[playerId].cardsInHand = playerSecrets[
    playerId
  ].cardsInHand.filter((a) => a !== cardId);

  const existingCardInRegister =
    playerSecrets[playerId].programRegisters[registerIndex];
  if (existingCardInRegister !== null) {
    playerSecrets[playerId].cardsInHand.push(existingCardInRegister);
  }

  playerSecrets[playerId].programRegisters[registerIndex] = cardId;

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
): {
  game: Game;
  message: string;
  automaticAction?: AutomaticAction;
} => {
  switch (action.type) {
    case "start":
      return startGame(game, action);
    case "deal-program-cards":
      return dealProgramCards(game, action);
    case "set-register":
      return setRegister(game, action);
    case "finish-setting-registers":
      return finishSettingRegisters(game, action);
    case "process-registers":
      return processRegister(game, action);
    default:
      return { game, message: "OK" };
  }
};
