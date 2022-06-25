import {
  AutomaticAction,
  FinishSettingRegistersAction,
} from "../../../dist-common/game-action-types";
import { InstructionItem } from "../../../dist-common/game-types";
import Game from "../game-class";

const PROGRAM_REGISTER_COUNT = 5;

const finishSettingRegisters = (
  game: Game,
  action: FinishSettingRegistersAction
): {
  game: Game;
  message: string;
  automaticAction?: AutomaticAction;
} => {
  const { gameState, playerSecrets, players } = game;
  if (gameState.state !== "main") {
    return {
      game,
      message: "You can't do that right now.",
    };
  }

  const { playerId } = action;
  if (
    playerSecrets[playerId].programRegisters.some(
      (register) => register === null
    )
  ) {
    return {
      game,
      message: "You need to fully program your robot.",
    };
  }

  gameState.finishedProgrammingPlayers = [
    ...new Set([...gameState.finishedProgrammingPlayers, playerId]),
  ];

  if (gameState.finishedProgrammingPlayers.length === players.length) {
    gameState.instructionQueue = [];

    const { cardMap } = gameState;

    for (let n = 0; n < playerSecrets[playerId].programRegisters.length; n++) {
      const nthRegisters: InstructionItem[] = [];

      Object.entries(playerSecrets).forEach((entry) => {
        const [playerId, value] = entry;
        const { programRegisters } = value;
        const programCardId = programRegisters[n]!;
        const programCard = cardMap[programCardId];
        nthRegisters.push({
          playerId,
          payload: programCard,
        });
      });

      gameState.instructionQueue.push(
        ...nthRegisters.sort((a, b) => b.payload.priority - a.payload.priority)
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
