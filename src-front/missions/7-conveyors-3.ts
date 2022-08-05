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
  "program-card-81",
];

const map: Map = {
  name: "Conveyors 3",
  height: 16,
  width: 4,
  items: [
    { type: "dock", number: 1, x: 1, y: 1, id: 0 },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 2,
      x: 1,
      y: 3,
      id: 1,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 2,
      x: 1,
      y: 4,
      id: 2,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 2,
      x: 1,
      y: 5,
      id: 3,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 2,
      x: 1,
      y: 6,
      id: 4,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 2,
      x: 1,
      y: 7,
      id: 5,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 2,
      x: 1,
      y: 8,
      id: 6,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 2,
      x: 1,
      y: 9,
      id: 7,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 2,
      x: 1,
      y: 10,
      id: 8,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 2,
      x: 1,
      y: 11,
      id: 9,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 2,
      x: 1,
      y: 12,
      id: 10,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 2,
      x: 1,
      y: 13,
      id: 11,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 2,
      x: 1,
      y: 14,
      id: 12,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 2,
      x: 1,
      y: 15,
      id: 13,
    },
    { type: "pit", x: 2, y: 7, id: 14 },
    { type: "pit", x: 2, y: 9, id: 15 },
    { type: "pit", x: 2, y: 6, id: 16 },
    { type: "pit", x: 2, y: 5, id: 17 },
    { type: "pit", x: 2, y: 4, id: 18 },
    { type: "pit", x: 2, y: 3, id: 19 },
    { type: "pit", x: 2, y: 2, id: 20 },
    { type: "pit", x: 2, y: 1, id: 21 },
    { type: "pit", x: 0, y: 1, id: 22 },
    { type: "pit", x: 0, y: 2, id: 23 },
    { type: "pit", x: 0, y: 3, id: 24 },
    { type: "pit", x: 0, y: 4, id: 25 },
    { type: "pit", x: 0, y: 5, id: 26 },
    { type: "pit", x: 0, y: 6, id: 27 },
    { type: "pit", x: 0, y: 7, id: 28 },
    { type: "pit", x: 0, y: 8, id: 29 },
    { type: "pit", x: 0, y: 9, id: 30 },
    { type: "pit", x: 0, y: 10, id: 31 },
    { type: "pit", x: 0, y: 11, id: 32 },
    { type: "pit", x: 0, y: 12, id: 33 },
    { type: "pit", x: 2, y: 10, id: 34 },
    { type: "pit", x: 2, y: 11, id: 35 },
    { type: "pit", x: 2, y: 12, id: 36 },
    { type: "pit", x: 0, y: 13, id: 37 },
    { type: "pit", x: 0, y: 14, id: 38 },
    { type: "pit", x: 0, y: 15, id: 39 },
    { type: "flag", number: 1, x: 2, y: 8, id: 40 },
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
            x: 1,
            y: 1,
            facing: "down",
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
    missionHeading: "7: Conveyors 3",
    missionObjectives: [
      "Express move your robot twice as often compared to normal conveyors.",
    ],
    nextMission: "free-practice",
  };
};

export default getMissionData;
