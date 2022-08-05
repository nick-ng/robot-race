import type { GameData, Map } from "dist-common/game-types";
import { getCardMap } from "dist-common/card-map";
import {
  getBaseGameData,
  getBaseGameSettings,
  getBaseGameState,
  getBaseRobot,
} from "./0-base-mission";

const remainingDeck: string[] = [
  "program-card-35",
  "program-card-58",
  "program-card-73",
  "program-card-65",
  "program-card-77",
  "program-card-53",
  "program-card-67",
  "program-card-61",
  "program-card-69",
];

const map: Map = {
  name: "8: Gears",
  height: 7,
  width: 5,
  items: [
    { type: "flag", number: 1, x: 3, y: 1, id: 0 },
    { type: "dock", number: 1, x: 2, y: 5, id: 1 },
    { type: "gear", direction: "clockwise", x: 2, y: 2, id: 2 },
    { type: "gear", direction: "counter-clockwise", x: 2, y: 3, id: 3 },
  ],
};

export const getMissionData = (
  playerId: string
): {
  gameData: GameData;
  missionHeading: string;
  missionObjectives: string[];
  nextMission: string;
} => {
  const discardedCards: string[] = Object.keys(getCardMap()).filter(
    (cardId) => !remainingDeck.includes(cardId)
  );

  const gameData: GameData = {
    ...getBaseGameData(playerId, remainingDeck),
    gameState: {
      ...getBaseGameState(playerId),
      discardedCards,
      robots: [getBaseRobot(playerId, "up", map)],
    },
    gameSettings: {
      ...getBaseGameSettings(),
      map,
    },
  };

  return {
    gameData,
    missionHeading: "8: Gears",
    missionObjectives: [
      "Gears rotate your robot after it finishes executing a register.",
    ],
    nextMission: "free-practice",
  };
};

export default getMissionData;
