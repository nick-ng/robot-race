import type {
  GameAction,
  AutomaticAction,
} from "dist-common/game-action-types";
import type Game from "./game-class";

import startGame from "./actions/start-game";
import dealProgramCards from "./actions/deal-program-cards";
import setRegister from "./actions/set-register";
import finishSettingRegisters from "./actions/finish-setting-registers";
import forceSetRegisters from "./actions/force-set-registers";
import powerDownNextTurn from "./actions/power-down-next-turn";
import processRegister from "./actions/process-register";
import cleanUp from "./actions/clean-up";
import spawnRobot from "./actions/spawn-robot";

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
  if (process.env.NODE_ENV !== "production") {
    console.debug("action", action);
  }
  switch (action.type) {
    case "start":
      return startGame(game, action);
    case "deal-program-cards":
      return dealProgramCards(game, action);
    case "set-register":
      return setRegister(game, action);
    case "finish-setting-registers":
      return finishSettingRegisters(game, action);
    case "force-set-registers":
      return forceSetRegisters(game, action);
    case "power-down-next-turn":
      return powerDownNextTurn(game, action);
    case "process-registers":
      return processRegister(game, action);
    case "clean-up":
      return cleanUp(game, action);
    case "spawn-robot":
      return spawnRobot(game, action);
    default:
      return { game, message: "OK" };
  }
};
