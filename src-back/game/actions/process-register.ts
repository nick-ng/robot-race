import {
  AutomaticAction,
  ProcessRegisterAction,
} from "../../../dist-common/game-action-types";
import { MainGameState } from "../../../dist-common/game-types";
import Game from "../game-class";

import { rotateRobot, moveRobot } from "./program-card-functions";

const processRegister = (
  game: Game,
  _action: ProcessRegisterAction
): {
  game: Game;
  message: string;
  automaticAction?: AutomaticAction;
} => {
  const { playerSecrets, gameState } = game;
  if (gameState.state !== "main") {
    return {
      game,
      message: "Not main state",
    };
  }

  const { robots, instructionQueue } = gameState;

  if (instructionQueue.length === 0) {
    return {
      game,
      message: "OK",
    };
  }

  const { payload, playerId } = instructionQueue.shift()!;
  const robot = robots.find((r) => r.playerId === playerId)!;

  switch (payload.action) {
    case "Rotate Left":
    case "Rotate Right":
    case "U-Turn":
      rotateRobot(robot, payload.action);
      break;
    case "Move 1":
    case "Move 2":
    case "Move 3":
    case "Back Up":
      moveRobot(robot, robots, payload.action);
  }

  if (instructionQueue.length > 0) {
    return {
      game,
      message: "OK",
      automaticAction: {
        action: { playerId: "server", type: "process-registers" },
        delay: 500,
      },
    };
  }

  Object.values(playerSecrets).forEach((oneSecret) => {
    for (let n = 0; n < oneSecret.programRegisters.length; n++) {
      oneSecret.programRegisters[n] = null;
    }
  });

  gameState.finishedProgrammingPlayers = [];

  return {
    game,
    message: "OK",
  };
};

export default processRegister;
