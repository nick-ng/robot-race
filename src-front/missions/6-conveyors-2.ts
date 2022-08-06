import type { GameData, Map } from "dist-common/game-types";
import { getCardMap } from "dist-common/card-map";
import {
  getBaseGameData,
  getBaseGameSettings,
  getBaseGameState,
} from "./0-base-mission";

const remainingDeck: string[] = [
  "program-card-77",
  "program-card-72",
  "program-card-84",
  "program-card-52",
  "program-card-54",
  "program-card-50",
  "program-card-46",
  "program-card-06",
  "program-card-02",
];

const map: Map = {
  name: "Conveyors 2",
  height: 8,
  width: 7,
  items: [
    { type: "dock", number: 1, x: 1, y: 6, id: 0 },
    { type: "straight-conveyor", direction: "up", speed: 1, x: 1, y: 5, id: 1 },
    {
      type: "curved-conveyor",
      direction: "right",
      fromDirection: ["down"],
      showStraight: false,
      speed: 1,
      x: 1,
      y: 4,
      id: 2,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 1,
      x: 2,
      y: 4,
      id: 3,
    },
    {
      type: "curved-conveyor",
      direction: "up",
      fromDirection: ["left"],
      showStraight: false,
      speed: 1,
      x: 3,
      y: 4,
      id: 4,
    },
    { type: "straight-conveyor", direction: "up", speed: 1, x: 3, y: 3, id: 5 },
    { type: "flag", number: 1, x: 2, y: 2, id: 6 },
    { type: "wall", x: 2, y: 3, x1: 3, y1: 3, id: 7 },
    { type: "wall", x: 0, y: 4, x1: 1, y1: 4, id: 8 },
    { type: "wall", x: 2, y: 4, x1: 2, y1: 3, id: 9 },
    { type: "wall", x: 1, y: 4, x1: 1, y1: 3, id: 10 },
    { type: "wall", x: 0, y: 5, x1: 0, y1: 4, id: 11 },
    { type: "wall", x: 2, y: 5, x1: 2, y1: 4, id: 12 },
    { type: "wall", x: 3, y: 5, x1: 3, y1: 4, id: 13 },
    { type: "wall", x: 4, y: 5, x1: 4, y1: 4, id: 14 },
    { type: "wall", x: 5, y: 5, x1: 5, y1: 4, id: 15 },
    { type: "wall", x: 6, y: 4, x1: 6, y1: 3, id: 16 },
    { type: "wall", x: 5, y: 4, x1: 6, y1: 4, id: 17 },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 1,
      x: 0,
      y: 0,
      id: 18,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 1,
      x: 1,
      y: 0,
      id: 19,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 1,
      x: 2,
      y: 0,
      id: 20,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 1,
      x: 3,
      y: 0,
      id: 21,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 1,
      x: 4,
      y: 0,
      id: 22,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 1,
      x: 5,
      y: 0,
      id: 23,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 1,
      x: 6,
      y: 0,
      id: 24,
    },
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
            y: 6,
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
    missionHeading: "6: Conveyors 2",
    missionObjectives: [
      "When a conveyor carries your robot onto a curved conveyor, your robot will rotate.",
      "Curved conveyors also move your robot after it executes a register like a normal conveyor.",
    ],
    nextMission: "7-conveyors-3",
  };
};

export default getMissionData;
