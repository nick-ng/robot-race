import type {
  AutomaticAction,
  FinishSettingRegistersAction,
} from "../../../dist-common/game-action-types";
import type { ProgramCardInstruction } from "../../../dist-common/game-types";
import canSubmitProgram from "../../../dist-common/action-validators/can-submit-program";

import type Game from "../game-class";

const PROGRAM_REGISTER_COUNT = 5;

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
  const { canPerform } = canSubmitProgram(
    playerId,
    gameState,
    playerSecrets[playerId]?.programRegisters
  );

  if (canPerform) {
    gameState.finishedProgrammingPlayers = [
      ...new Set([...gameState.finishedProgrammingPlayers, playerId]),
    ];
  }

  const { cardMap, robots, seatOrder } = gameState;

  const nonOperatingRobots = robots.filter((r) => r.status !== "ok");
  if (
    gameState.finishedProgrammingPlayers.length + nonOperatingRobots.length <
    players.length
  ) {
    return {
      game,
      message: "OK",
    };
  }

  gameSecrets.instructionQueue = [];

  for (let register = 0; register < PROGRAM_REGISTER_COUNT; register++) {
    const nthRegisters: ProgramCardInstruction[] = [];

    Object.entries(playerSecrets).forEach((entry) => {
      const [playerId, value] = entry;

      const robot = robots.find((r) => r.playerId === playerId);
      if (robot && robot.status !== "ok") {
        return;
      }

      const { programRegisters } = value;
      const programCardId = programRegisters[register]!;
      const programCard = cardMap[programCardId];
      nthRegisters.push({
        type: "program-card-instruction",
        playerId,
        payload: {
          ...programCard,
        },
        register,
      });
    });

    // 4. Complete Registers
    gameSecrets.instructionQueue = gameSecrets.instructionQueue.concat([
      // A. Reveal Program Cards
      // B. Robots Move
      ...nthRegisters.sort(
        (a, b) => (b.payload.priority || 0) - (a.payload.priority || 0)
      ),
      // C. Board Elements Move
      {
        type: "conveyors-move-instruction",
        payload: { minSpeed: 2 },
        register,
      },
      {
        type: "conveyors-move-instruction",
        payload: { minSpeed: 1 },
        register,
      },
      // D. Lasers Fire
      {
        type: "lasers-fire-instruction",
        payload: { shooter: "robots" },
        register,
      },
      // E. Touch Checkpoints
      { type: "touch-checkpoint-instruction", register },
    ]);
  }

  gameState.robots.forEach((robot) => {
    if (robot.damagePoints === 0) {
      gameState.poweringDownNextTurn.push({
        playerId: robot.playerId,
        decision: "no",
      });
    }
  });

  if (
    gameState.robots.every(
      (robot) =>
        (robot.status === "ok" && robot.damagePoints === 0) ||
        robot.status === "powered-down" ||
        !seatOrder.includes(robot.playerId)
    )
  ) {
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
