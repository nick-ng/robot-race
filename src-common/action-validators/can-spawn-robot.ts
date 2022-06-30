import { Robot, MainGameState } from "../game-types";
import { getRespawnOrder } from "../utils";

export const canSpawnRobot = (
  playerId: string,
  robots: Robot[],
  seatOrder: MainGameState["seatOrder"]
):
  | { canPerform: true; message?: never }
  | { canPerform: false; message: string } => {
  if (!playerId || !robots || !seatOrder) {
    return { canPerform: false, message: "Missing parameters." };
  }

  const respawnOrder = getRespawnOrder(robots, seatOrder);

  if (respawnOrder[0] !== playerId) {
    return { canPerform: false, message: "You can't respawn your robot." };
  }

  return { canPerform: true };
};

export const needToSpawnRobot = (playerId: string, robots: Robot[]) => {
  return robots.some(
    (robot) => robot.playerId === playerId && robot.status === "stand-by"
  );
};

export default canSpawnRobot;
