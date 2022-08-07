import type { GameSettings, Robot } from "dist-common/game-types";

export const positionToOffsets = ({
  x,
  y,
}: {
  x: number;
  y: number;
}): { x: string; y: string } => {
  const ratioX = 2.8;
  const ratioY = 2.805;
  const ratioPxX = 0;
  const ratioPxY = 0;
  const constantX = 0.43;
  const constantY = 0.43;

  return {
    x: `calc(${ratioX * x + constantX}vw + ${ratioPxX * x}px)`,
    y: `calc(${ratioY * y + constantY}vw + ${ratioPxY * y}px)`,
  };
};

export const isTimerVisible = ({
  playerId,
  timerStart,
  robots,
  finishedProgrammingPlayers,
  seatOrder,
}: {
  playerId: string;
  timerStart: GameSettings["timerStart"];
  robots: Robot[];
  finishedProgrammingPlayers: string[];
  seatOrder: string[];
}): boolean => {
  if (finishedProgrammingPlayers.length === seatOrder.length) {
    return false;
  }

  const poweredDownRobotsCount = robots.filter(
    (r) => r.status === "powered-down"
  ).length;

  if (
    timerStart === "first" &&
    finishedProgrammingPlayers.length - poweredDownRobotsCount >= 1
  ) {
    return true;
  }

  if (
    timerStart === "penultimate" &&
    finishedProgrammingPlayers.length + 1 >= seatOrder.length
  ) {
    return true;
  }

  return false;
};
