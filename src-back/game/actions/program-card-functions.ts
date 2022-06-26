import { Robot } from "../../../dist-common/game-types";

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

/**
 * Check which robots will be affected by a push.
 *
 * If a push isn't possible because of a wall or similar, returns false.
 */
const pushRobots = (
  robots: Robot[],
  direction: { xd: number; yd: number },
  target: { x: number; y: number }
): boolean => {
  let canPush = true;
  let pushed = false;

  const newPositions: { playerId: string | null; x: number; y: number }[] = [
    {
      playerId: null,
      x: target.x,
      y: target.y,
    },
  ];

  do {
    pushed = false;
    for (const robot of robots) {
      const { position } = robot;
      if (
        newPositions[0].x === position.x &&
        newPositions[0].y === position.y
      ) {
        newPositions.unshift({
          playerId: robot.playerId,
          x: position.x + direction.xd,
          y: position.y + direction.yd,
        });
        pushed = true;
      }
    }
  } while (pushed);

  if (canPush) {
    newPositions.forEach((newPosition) => {
      const robot = robots.find((r) => r.playerId === newPosition.playerId);

      if (robot) {
        (robot.position.x = newPosition.x), (robot.position.y = newPosition.y);
      }
    });
  }

  return canPush;
};

export const moveRobot = (
  robot: Robot,
  robots: Robot[],
  action: "Move 1" | "Move 2" | "Move 3" | "Back Up"
): void => {
  const otherRobots = robots.filter((a) => a.playerId !== robot.playerId);

  const { xd, yd } = movementDirectionMap[robot.position.facing];
  let speed = speedMap[action];
  const step = action === "Back Up" ? -1 : 1;
  do {
    const newPosition = {
      playerId: robot.playerId,
      x: robot.position.x + xd * step,
      y: robot.position.y + yd * step,
    };

    const canPush = pushRobots(
      otherRobots,
      { xd: xd * step, yd: yd * step },
      { x: newPosition.x, y: newPosition.y }
    );

    if (canPush) {
      robot.position.x = newPosition.x;
      robot.position.y = newPosition.y;
    }

    speed--;
  } while (speed > 0);
};
