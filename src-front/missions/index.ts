import type { GameData } from "dist-common/game-types";

import getFreePracticeData from "./free-practice";
import get1MovementData from "./1-movement";
import get2MovementData from "./2-movement";
import get3TurnsData from "./3-turns";
import get4WallsData from "./4-walls";
import getTestPowerDownData from "./test-power-down";

export const getMissionData = (
  playerId: string,
  missionName?: string
): {
  gameData: GameData;
  missionHeading: string;
  missionObjectives: string[];
  nextMission?: string;
} => {
  switch (missionName?.toLowerCase()) {
    case "1-movement":
      return get1MovementData(playerId);
    case "2-movement":
      return get2MovementData(playerId);
    case "3-turns":
      return get3TurnsData(playerId);
    case "4-walls":
      return get4WallsData(playerId);
    case "test-power-down":
      return getTestPowerDownData(playerId);
    case "free-practice":
    default:
      return getFreePracticeData(playerId);
  }
};
