import {
  AutomaticAction,
  ProcessRegisterAction,
} from "../../../dist-common/game-action-types";
import Game from "../game-class";

import { rotateRobot, moveRobotOne } from "./program-card-functions";
import { touchCheckpoints, fallInHoles } from "./server-functions";
import { conveyorsMove } from "./conveyors";
import { isRobotDestroyed } from "./utils";

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

  const { robots, flagsTouched } = gameState;
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
      case "Move 3":
        moveRobotOne(robot, robots, payload.action, map.items);
        fallInHoles(robots, map);
      case "Move 2":
        moveRobotOne(robot, robots, payload.action, map.items);
        fallInHoles(robots, map);
      case "Move 1":
      case "Back Up":
        moveRobotOne(robot, robots, payload.action, map.items);
        fallInHoles(robots, map);
        break;
      default:
    }
  } else {
    delay = 10;
    switch (instructionItem.type) {
      case "conveyors-move-instruction":
        // Express conveyor belts move 1 space / Express and normal conveyor belts move 1 space
        const moved = conveyorsMove(
          robots,
          map.items,
          instructionItem.payload.minSpeed
        );
        fallInHoles(robots, map);
        if (moved) {
          delay = 500;
        }
        break;
      case "touch-checkpoint-instruction":
        const touched = touchCheckpoints(robots, map.items, flagsTouched);
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

  // don't need to process instructions of dead players
  for (const robot of robots) {
    if (isRobotDestroyed(robot)) {
      const { playerId } = robot;
      gameSecrets.instructionQueue = instructionQueue.filter((item) => {
        if (item.playerId && playerId === item.playerId) {
          return false;
        }
        return true;
      });
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
      action: { playerId: "server", type: "clean-up" },
      delay: 10,
    },
  };
};

export default processRegister;
