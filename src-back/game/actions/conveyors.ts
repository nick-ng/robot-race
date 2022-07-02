import {
  Robot,
  Map,
  MapItem,
  MainGameState,
  FlagMapItem,
  StraightConveyorMapItem,
} from "../../../dist-common/game-types";

const movementDirectionMap = {
  up: { xd: 0, yd: -1 },
  right: { xd: 1, yd: 0 },
  down: { xd: 0, yd: 1 },
  left: { xd: -1, yd: 0 },
} as const;

export const conveyorsMove = (
  robots: Robot[],
  mapItems: MapItem[],
  minSpeed: number
) => {
  // 10. Create temporary copy of all robots
  const tempRobots = robots.map((r) => ({
    playerId: r.playerId,
    x: r.position.x,
    y: r.position.y,
  }));

  // 20. Move all temporary robots on conveyors minus walls
  for (const tempRobot of tempRobots) {
    const conveyorItem = mapItems.find(
      (mi) =>
        mi.type === "straight-conveyor" &&
        mi.speed >= minSpeed &&
        mi.x === tempRobot.x &&
        mi.y === tempRobot.y
    ) as StraightConveyorMapItem | undefined;

    if (conveyorItem) {
      const { xd, yd } = movementDirectionMap[conveyorItem.direction];
      tempRobot.x = tempRobot.x + xd;
      tempRobot.y = tempRobot.y + yd;
    }
  }

  // 30. Check which temporary robots don't overlap other temporary robots
  const movedRobots = [];
  for (const tempRobot of tempRobots) {
    const otherTempRobots = tempRobots.filter(
      (tr) => tr.playerId !== tempRobot.playerId
    );

    if (
      !otherTempRobots.some(
        (otr) => otr.x === tempRobot.x && otr.y === tempRobot.y
      )
    ) {
      movedRobots.push(tempRobot);
    }
  }
  // 40. Update position of robots that did move
  movedRobots.forEach((mr) => {
    const robot = robots.find((r) => r.playerId === mr.playerId);
    if (robot) {
      robot.position.x = mr.x;
      robot.position.y = mr.y;
    }
  });

  return movedRobots.length > 0;
};
