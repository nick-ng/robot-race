import { OverGameState } from "src-common/game-types";
import {
  AutomaticAction,
  ProcessRegisterAction,
} from "../../../dist-common/game-action-types";
import Game from "../game-class";

import { rotateRobot, moveRobot } from "./program-card-functions";
import { touchCheckpoints } from "./server-functions";

const processRegister = (
  game: Game,
  _action: ProcessRegisterAction
): {
  game: Game;
  message: string;
  automaticAction?: AutomaticAction;
} => {
  const { gameState, gameSecrets, gameSettings } = game;
  if (gameState.state !== "main") {
    return {
      game,
      message: "Not main state",
    };
  }

  const { robots, flagsTouched, archiveMarkers } = gameState;
  const { instructionQueue } = gameSecrets;
  const { map } = gameSettings;

  if (instructionQueue.length === 0) {
    return {
      game,
      message: "OK",
    };
  }

  const instructionItem = instructionQueue.shift()!;

  let delay = 500;

  if (instructionItem.type === "program-card-instruction") {
    const { playerId, payload } = instructionItem;
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
        break;
      default:
    }
  } else {
    delay = 10;
    const { payload } = instructionItem;
    switch (payload.action) {
      case "touch-checkpoints":
        const touched = touchCheckpoints(
          robots,
          map,
          flagsTouched,
          archiveMarkers
        );
        if (touched.length > 0) {
          delay = 400;
        }
        break;
      default:
    }
  }

  // check victory conditions
  for (const n of Object.values(flagsTouched)) {
    if (
      n === gameSettings.map.items.filter((mi) => mi.type === "flag").length
    ) {
      game.gameState.state = "over";

      return {
        game,
        message: "OK",
      };
    }
  }

  if (instructionQueue.length > 0) {
    return {
      game,
      message: "OK",
      automaticAction: {
        action: { playerId: "server", type: "process-registers" },
        delay,
      },
    };
  }

  gameState.finishedProgrammingPlayers = [];

  return {
    game,
    message: "OK",
    automaticAction: {
      action: { playerId: "server", type: "deal-program-cards" },
      delay: 10,
    },
  };
};

export default processRegister;
