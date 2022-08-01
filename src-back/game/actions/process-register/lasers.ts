import type { Robot, MapItem } from "dist-common/game-types";

import { getLaserTarget } from "../../../../dist-common/get-laser-target";

import { damageRobot, isRobotDestroyed } from "../utils";

export const shootRobotLasers = (
  robots: Robot[],
  mapItems: MapItem[]
): boolean => {
  let shotsFired = false;
  for (const robot of robots) {
    if (isRobotDestroyed(robot)) {
      continue;
    }

    const { position } = robot;

    const targetRobot = getLaserTarget(
      position,
      robots.filter((r) => r.playerId !== robot.playerId),
      mapItems,
      false
    ) as Robot | null;

    if (targetRobot) {
      shotsFired = true;
      damageRobot(targetRobot);
      robot.laser = {
        height: robot.position.y - targetRobot.position.y,
        width: robot.position.x - targetRobot.position.x,
      };
    }
  }

  return shotsFired;
};
