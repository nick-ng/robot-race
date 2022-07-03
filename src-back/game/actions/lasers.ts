import { Robot, MapItem, WallMapItem } from "../../../dist-common/game-types";
import { damageRobot, isRobotDestroyed } from "./utils";

const directionMap = {
  up: { xd: 0, yd: -1 },
  right: { xd: 1, yd: 0 },
  down: { xd: 0, yd: 1 },
  left: { xd: -1, yd: 0 },
} as const;

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
    const { xd, yd } = directionMap[position.facing];

    let parallel: "x" | "y" = "y";
    let perpendicular: "x" | "y" = "x";
    let paralleld: number = yd;

    if (["left", "right"].includes(position.facing)) {
      parallel = "x";
      perpendicular = "y";
      paralleld = xd;
    }

    const parallel1 = `${parallel}1` as const;
    const perpendicular1 = `${perpendicular}1` as const;

    const blockingWalls = mapItems.filter((mi) => {
      return (
        mi.type === "wall" &&
        mi[perpendicular] === position[perpendicular] &&
        mi[perpendicular1] === position[perpendicular]
      );
    });

    const blockingRobots = robots.filter((r) => {
      return (
        r.playerId !== robot.playerId &&
        r.position[perpendicular] === position[perpendicular] &&
        !isRobotDestroyed(r)
      );
    });

    type Thing = { playerId: string; x: number; y: number };
    const blockingThings = blockingWalls
      .map((wall) => ({
        playerId: null as string | null,
        [perpendicular]: wall[perpendicular],
        [parallel]: (wall[parallel] + (wall as WallMapItem)[parallel1]) * 0.5,
      }))
      .concat(
        blockingRobots.map((r) => ({
          playerId: r.playerId,
          [perpendicular]: r.position[perpendicular],
          [parallel]: r.position[parallel],
        }))
      )
      .filter(
        (a) =>
          (a as Thing)[parallel] * paralleld > position[parallel] * paralleld
      )
      .sort(
        (a, b) => paralleld * ((a as Thing)[parallel] - (b as Thing)[parallel])
      );

    if (blockingThings.length > 0) {
      const targetRobot = robots.find(
        (r) => r.playerId === blockingThings[0].playerId
      );

      if (targetRobot) {
        shotsFired = true;
        damageRobot(targetRobot);
      }
    }
  }

  return shotsFired;
};
