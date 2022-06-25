import { Robot, ProgramCard } from "../../../dist-common/game-types";

const rotateMap: Readonly<any> = {
  "Rotate Left": {
    up: "left",
    left: "down",
    down: "right",
    right: "up",
  },
  "Rotate Right": {
    up: "right",
    right: "down",
    down: "left",
    left: "up",
  },
  "U-Turn": {
    up: "down",
    down: "up",
    left: "right",
    right: "left",
  },
};

export const rotateRobot = (
  robot: Robot,
  action: "Rotate Left" | "Rotate Right" | "U-Turn"
): void => {
  robot.position.facing = rotateMap[action][robot.position.facing];
};

const movementDirectionMap = {
  up: { xd: 0, yd: -1 },
  right: { xd: 1, yd: 0 },
  down: { xd: 0, yd: 1 },
  left: { xd: -1, yd: 0 },
};

const speedMap = {
  "Move 1": 1,
  "Move 2": 2,
  "Move 3": 3,
  "Back Up": -1,
};

export const moveRobot = (
  robot: Robot,
  robots: Robot[],
  action: "Move 1" | "Move 2" | "Move 3" | "Back Up"
): void => {
  const { facing, x, y } = robot.position;

  const { xd, yd } = movementDirectionMap[facing];
  const speed = speedMap[action];
  const newSquare = { x: x + xd * speed, y: y + yd * speed };
  robot.position.x = newSquare.x;
  robot.position.y = newSquare.y;

  // Handle other robots getting pushed.
  const otherRobots = robots.filter((a) => a.playerId !== robot.playerId);
};
