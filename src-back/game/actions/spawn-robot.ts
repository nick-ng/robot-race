import {
  AutomaticAction,
  SpawnRobotAction,
} from "../../../dist-common/game-action-types";
import canSpawnRobot from "../../../dist-common/action-validators/can-spawn-robot";
import Game from "../game-class";

const spawnRobot = (
  game: Game,
  action: SpawnRobotAction
): { game: Game; message: string; automaticAction?: AutomaticAction } => {
  const { gameState, gameSettings } = game;
  if (gameState.state !== "main") {
    return {
      game,
      message: "Not the main game state",
    };
  }

  const { robots, seatOrder } = gameState;
  const { playerId, facing, x, y } = action;

  const { canPerform, message } = canSpawnRobot(playerId, robots, seatOrder);

  if (!canPerform) {
    return {
      game,
      message,
    };
  }

  const robot = robots.find((r) => r.playerId === playerId)!;
  const { map } = gameSettings;

  const archiveMarker = map.items.find(
    (mi) => mi.id === robot.archiveMarkerId
  )!;

  const isOccupied = robots.find(
    (r) =>
      r.status === "ok" &&
      r.playerId !== playerId &&
      r.position.x === archiveMarker.x &&
      r.position.y === archiveMarker.y
  );
  if (isOccupied) {
    const isAdjacentToArchiveMarker =
      Math.abs(x - archiveMarker.x) <= 1 &&
      Math.abs(y - archiveMarker.y) <= 1 &&
      (x !== archiveMarker.x || y !== archiveMarker.y);
    const cellItemTypes = map.items
      .filter((mi) => mi.x === x && mi.y === y)
      .map((mi) => mi.type);
    const isOutOfBounds = x < 0 || y < 0 || x >= map.width || y >= map.height;
    const isSquareValid =
      isAdjacentToArchiveMarker &&
      !isOutOfBounds &&
      !cellItemTypes.includes("pit");

    if (!isSquareValid) {
      return {
        game,
        message: "You can't respawn there.",
      };
    }

    robot.position.x = x;
    robot.position.y = y;
    robot.position.facing = facing;
    robot.status = "ok";
  } else {
    robot.position.x = archiveMarker.x;
    robot.position.y = archiveMarker.y;
    robot.position.facing = facing;
    robot.status = "ok";
  }

  if (robots.filter((r) => r.status === "stand-by").length <= 0) {
    return {
      game,
      message: "OK",
      automaticAction: {
        action: { playerId: "server", type: "deal-program-cards" },
        delay: 10,
      },
    };
  }

  return { game, message: "OK" };
};

export default spawnRobot;
