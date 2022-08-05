import type { GameData, Map } from "dist-common/game-types";
import { getCardMap } from "dist-common/card-map";
import {
  getBaseGameData,
  getBaseGameSettings,
  getBaseGameState,
} from "./0-base-mission";

const remainingDeck: string[] = [
  "program-card-74",
  "program-card-55",
  "program-card-46",
  "program-card-35",
  "program-card-10",
  "program-card-06",
  "program-card-09",
  "program-card-22",
  "program-card-03",
];

const map: Map = {
  name: "Conveyors 1",
  height: 10,
  width: 6,
  items: [
    { type: "dock", number: 1, x: 2, y: 8, id: 0 },
    { type: "straight-conveyor", direction: "up", speed: 1, x: 2, y: 6, id: 1 },
    { type: "straight-conveyor", direction: "up", speed: 1, x: 2, y: 5, id: 2 },
    { type: "straight-conveyor", direction: "up", speed: 1, x: 2, y: 4, id: 3 },
    { type: "straight-conveyor", direction: "up", speed: 1, x: 2, y: 3, id: 4 },
    { type: "straight-conveyor", direction: "up", speed: 1, x: 2, y: 2, id: 5 },
    { type: "straight-conveyor", direction: "up", speed: 1, x: 2, y: 1, id: 6 },
    { type: "straight-conveyor", direction: "up", speed: 1, x: 2, y: 0, id: 7 },
    { type: "wall", x: 3, y: 4, x1: 2, y1: 4, id: 8 },
    { type: "wall", x: 3, y: 2, x1: 2, y1: 2, id: 9 },
    { type: "wall", x: 2, y: 7, x1: 1, y1: 7, id: 10 },
    { type: "wall", x: 2, y: 6, x1: 1, y1: 6, id: 11 },
    { type: "wall", x: 2, y: 5, x1: 1, y1: 5, id: 12 },
    { type: "wall", x: 2, y: 4, x1: 1, y1: 4, id: 13 },
    { type: "wall", x: 2, y: 3, x1: 1, y1: 3, id: 14 },
    { type: "wall", x: 2, y: 2, x1: 1, y1: 2, id: 15 },
    { type: "wall", x: 2, y: 1, x1: 1, y1: 1, id: 16 },
    { type: "wall", x: 2, y: 0, x1: 1, y1: 0, id: 17 },
    { type: "flag", number: 1, x: 3, y: 3, id: 18 },
    { type: "wall", x: 3, y: 5, x1: 3, y1: 4, id: 19 },
    { type: "wall", x: 4, y: 5, x1: 4, y1: 4, id: 20 },
    { type: "wall", x: 5, y: 5, x1: 5, y1: 4, id: 21 },
    { type: "wall", x: 3, y: 0, x1: 2, y1: 0, id: 22 },
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
      robots: [
        {
          playerId: playerId,
          status: "ok",
          damagePoints: 0,
          lockedRegisters: [],
          lives: 3,
          position: {
            x: 2,
            y: 8,
            facing: "up",
          },
          archiveMarkerId: 0,
          design: "outset",
        },
      ],
    },
    gameSettings: {
      ...getBaseGameSettings(),
      map,
    },
  };

  return {
    gameData,
    missionHeading: "5: Conveyors 1",
    missionObjectives: [
      "Conveyors move your robot 1 square after it executes each program register.",
      "Don't let your robot get carried off the map by a conveyor!",
    ],
    nextMission: "6-conveyors-2",
  };
};

export default getMissionData;
