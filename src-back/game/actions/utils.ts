import { Robot } from "../../../dist-common/game-types";

export const isRobotDestroyed = (robot: Robot): boolean => {
  const { status } = robot;
  return ["falling", "destroyed"].includes(status);
};

export const destroyRobots = (robots: Robot[]) => {
  for (const robot of robots) {
    if (robot.damagePoints >= 10 || ["falling"].includes(robot.status)) {
      robot.status = "destroyed";
    }
  }
};
