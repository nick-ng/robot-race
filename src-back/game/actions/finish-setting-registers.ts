import {
  AutomaticAction,
  FinishSettingRegistersAction,
} from "../../../dist-common/game-action-types";
import { ProgramCardInstruction } from "../../../dist-common/game-types";
import canSubmitProgram from "../../../dist-common/action-validators/can-submit-program";

import Game from "../game-class";

const finishSettingRegisters = (
  game: Game,
  action: FinishSettingRegistersAction
): {
  game: Game;
  message: string;
  automaticAction?: AutomaticAction;
} => {
  const { gameState, playerSecrets, players, gameSecrets } = game;
  if (gameState.state !== "main") {
    return {
      game,
      message: "You can't do that right now.",
    };
  }

  const { playerId } = action;
  const { canPerform, message } = canSubmitProgram(
    playerSecrets[playerId].programRegisters
  );

  if (!canPerform) {
    return {
      game,
      message,
    };
  }

  gameState.finishedProgrammingPlayers = [
    ...new Set([...gameState.finishedProgrammingPlayers, playerId]),
  ];

  if (gameState.finishedProgrammingPlayers.length === players.length) {
    gameSecrets.instructionQueue = [];

    const { cardMap } = gameState;

    for (let n = 0; n < playerSecrets[playerId].programRegisters.length; n++) {
      const nthRegisters: ProgramCardInstruction[] = [];

      Object.entries(playerSecrets).forEach((entry) => {
        const [playerId, value] = entry;
        const { programRegisters } = value;
        const programCardId = programRegisters[n]!;
        const programCard = cardMap[programCardId];
        nthRegisters.push({
          type: "program-card-instruction",
          playerId,
          payload: {
            ...programCard,
          },
        });
      });

      gameSecrets.instructionQueue.push(
        ...nthRegisters.sort(
          (a, b) => (b.payload.priority || 0) - (a.payload.priority || 0)
        ),
        {
          type: "touch-checkpoint-instruction",
          payload: { action: "touch-checkpoints" },
        }
      );
    }

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

export default finishSettingRegisters;
