import {
  Robot,
  Map,
  MapItem,
  MainGameState,
  FlagMapItem,
  WallMapItem,
  StraightConveyorMapItem,
} from "../../../dist-common/game-types";
import { isRobotDestroyed } from "./utils";

const directionMap = {
  up: { xd: 0, yd: -1 },
  right: { xd: 1, yd: 0 },
  down: { xd: 0, yd: 1 },
  left: { xd: -1, yd: 0 },
} as const;

export const shootRobotLasersVertical = (
  robots: Robot[],
  mapItems: MapItem[]
): boolean => {
  let shotsFired = false;
  for (const robot of robots) {
    if (isRobotDestroyed(robot)) {
      continue;
    }

    const { position } = robot;
    const { xd, yd } = directionMap[position.facing];

    if (["up", "down"].includes(position.facing)) {
      const blockingWalls = mapItems.filter(
        (mi) =>
          mi.type === "wall" && mi.x === position.x && mi.x1 === position.x
      );
      const blockingRobots = robots.filter(
        (r) =>
          r.playerId !== robot.playerId &&
          r.position.x === position.x &&
          !isRobotDestroyed(r)
      );

      const blockingThings = blockingWalls
        .map((wall) => ({
          playerId: null as string | null,
          x: wall.x,
          y: (wall.y + (wall as WallMapItem).y1) * 0.5,
        }))
        .concat(
          blockingRobots.map((r) => ({
            playerId: r.playerId,
            x: r.position.x,
            y: r.position.y,
          }))
        )
        .filter((a) => a.y * yd > position.y * yd)
        .sort((a, b) => yd * (a.y - b.y));

      if (blockingThings.length > 0) {
        const targetRobot = robots.find(
          (r) => r.playerId === blockingThings[0].playerId
        );

        if (targetRobot) {
          shotsFired = true;
          targetRobot.damagePoints = targetRobot.damagePoints + 1;
        }
      }

      if (robot.playerId === "player-1's-uuid") {
        console.log("robot", robot);
        console.log("xyd", { xd, yd });
        console.log("blockingThings", blockingThings);
      }
    }
  }

  return shotsFired;
};
