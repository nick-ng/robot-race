import { Robot } from "../../../dist-common/game-types";

export const isRobotDestroyed = (robot: Robot): boolean => {
  const { damagePoints, status } = robot;
  return damagePoints >= 10 || ["falling"].includes(status);
};
