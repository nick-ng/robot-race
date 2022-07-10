import type {
  AutomaticAction,
  PowerDownNextTurnAction,
} from "../../../dist-common/game-action-types";
import type { MainGameState } from "../../../dist-common/game-types";
import canPowerDownRobot from "../../../dist-common/action-validators/can-power-down";

import type Game from "../game-class";

const powerDownNextTurn = (
  game: Game,
  action: PowerDownNextTurnAction
): { game: Game; message: string; automaticAction?: AutomaticAction } => {
  const { gameState } = game;
  const { canPerform, message } = canPowerDownRobot(action.playerId, gameState);

  if (!canPerform) {
    return {
      game,
      message,
    };
  }

  const { poweringDownNextTurn, seatOrder } = gameState as MainGameState;
  const { type, ...decision } = action;
  poweringDownNextTurn.push(decision);

  if (poweringDownNextTurn.length === seatOrder.length) {
    return {
      game,
      message: "OK",
      automaticAction: {
        action: { playerId: "server", type: "process-registers" },
        delay: 500,
      },
    };
  }

  return {
    game,
    message: "OK",
  };
};

export default powerDownNextTurn;
