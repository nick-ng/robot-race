import type { GameData, GameSettings } from "dist-common/game-types";
import { getCardMap } from "dist-common/card-map";
import {
  getBaseGameData,
  getBaseGameSettings,
  getBaseGameState,
} from "./0-base-mission";

const remainingDeck: string[] = [
  "program-card-79",
  "program-card-66",
  "program-card-56",
  "program-card-50",
  "program-card-52",
  "program-card-58",
  "program-card-57",
  "program-card-65",
  "program-card-60",
  "program-card-49",
  "program-card-53",
  "program-card-54",
  "program-card-61",
  "program-card-64",
  "program-card-59",
  "program-card-55",
  "program-card-63",
  "program-card-62",
  "program-card-51",
];

const map: GameSettings["map"] = {
  name: "Unnamed",
  height: 8,
  width: 6,
  items: [
    {
      type: "gear",
      direction: "clockwise",
      x: 1,
      y: 1,
      id: 0,
    },
    {
      type: "gear",
      direction: "clockwise",
      x: 3,
      y: 1,
      id: 1,
    },
    {
      type: "gear",
      direction: "clockwise",
      x: 4,
      y: 2,
      id: 2,
    },
    {
      type: "gear",
      direction: "clockwise",
      x: 2,
      y: 2,
      id: 3,
    },
    {
      type: "gear",
      direction: "clockwise",
      x: 1,
      y: 3,
      id: 4,
    },
    {
      type: "gear",
      direction: "clockwise",
      x: 3,
      y: 3,
      id: 5,
    },
    {
      type: "gear",
      direction: "clockwise",
      x: 2,
      y: 4,
      id: 6,
    },
    {
      type: "gear",
      direction: "clockwise",
      x: 4,
      y: 4,
      id: 7,
    },
    {
      type: "gear",
      direction: "clockwise",
      x: 3,
      y: 5,
      id: 8,
    },
    {
      type: "gear",
      direction: "clockwise",
      x: 1,
      y: 5,
      id: 9,
    },
    {
      type: "gear",
      direction: "counter-clockwise",
      x: 2,
      y: 1,
      id: 10,
    },
    {
      type: "gear",
      direction: "counter-clockwise",
      x: 4,
      y: 1,
      id: 11,
    },
    {
      type: "gear",
      direction: "counter-clockwise",
      x: 3,
      y: 2,
      id: 12,
    },
    {
      type: "gear",
      direction: "counter-clockwise",
      x: 4,
      y: 3,
      id: 13,
    },
    {
      type: "gear",
      direction: "counter-clockwise",
      x: 1,
      y: 2,
      id: 14,
    },
    {
      type: "gear",
      direction: "counter-clockwise",
      x: 2,
      y: 3,
      id: 15,
    },
    {
      type: "gear",
      direction: "counter-clockwise",
      x: 1,
      y: 4,
      id: 16,
    },
    {
      type: "gear",
      direction: "counter-clockwise",
      x: 3,
      y: 4,
      id: 17,
    },
    {
      type: "gear",
      direction: "counter-clockwise",
      x: 2,
      y: 5,
      id: 18,
    },
    {
      type: "gear",
      direction: "counter-clockwise",
      x: 4,
      y: 5,
      id: 19,
    },
    {
      type: "flag",
      number: 1,
      x: 4,
      y: 6,
      id: 20,
    },
    {
      type: "dock",
      number: 1,
      x: 1,
      y: 6,
      id: 21,
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
    missionHeading: "1: Movement",
    missionObjectives: [
      "Move your robot by placing program cards registers.",
      "You need to end a register on the flag to count as touching it.",
    ],
    nextMission: "2-movement",
  };
};

export default getMissionData;

/**
{
  "name": "Unnamed",
  "height": 8,
  "width": 6,
  "items": [
    {
      "type": "gear",
      "direction": "clockwise",
      "x": 1,
      "y": 1,
      "id": 0
    },
    {
      "type": "gear",
      "direction": "clockwise",
      "x": 3,
      "y": 1,
      "id": 1
    },
    {
      "type": "gear",
      "direction": "clockwise",
      "x": 4,
      "y": 2,
      "id": 2
    },
    {
      "type": "gear",
      "direction": "clockwise",
      "x": 2,
      "y": 2,
      "id": 3
    },
    {
      "type": "gear",
      "direction": "clockwise",
      "x": 1,
      "y": 3,
      "id": 4
    },
    {
      "type": "gear",
      "direction": "clockwise",
      "x": 3,
      "y": 3,
      "id": 5
    },
    {
      "type": "gear",
      "direction": "clockwise",
      "x": 2,
      "y": 4,
      "id": 6
    },
    {
      "type": "gear",
      "direction": "clockwise",
      "x": 4,
      "y": 4,
      "id": 7
    },
    {
      "type": "gear",
      "direction": "clockwise",
      "x": 3,
      "y": 5,
      "id": 8
    },
    {
      "type": "gear",
      "direction": "clockwise",
      "x": 1,
      "y": 5,
      "id": 9
    },
    {
      "type": "gear",
      "direction": "counter-clockwise",
      "x": 2,
      "y": 1,
      "id": 10
    },
    {
      "type": "gear",
      "direction": "counter-clockwise",
      "x": 4,
      "y": 1,
      "id": 11
    },
    {
      "type": "gear",
      "direction": "counter-clockwise",
      "x": 3,
      "y": 2,
      "id": 12
    },
    {
      "type": "gear",
      "direction": "counter-clockwise",
      "x": 4,
      "y": 3,
      "id": 13
    },
    {
      "type": "gear",
      "direction": "counter-clockwise",
      "x": 1,
      "y": 2,
      "id": 14
    },
    {
      "type": "gear",
      "direction": "counter-clockwise",
      "x": 2,
      "y": 3,
      "id": 15
    },
    {
      "type": "gear",
      "direction": "counter-clockwise",
      "x": 1,
      "y": 4,
      "id": 16
    },
    {
      "type": "gear",
      "direction": "counter-clockwise",
      "x": 3,
      "y": 4,
      "id": 17
    },
    {
      "type": "gear",
      "direction": "counter-clockwise",
      "x": 2,
      "y": 5,
      "id": 18
    },
    {
      "type": "gear",
      "direction": "counter-clockwise",
      "x": 4,
      "y": 5,
      "id": 19
    },
    {
      "type": "flag",
      "number": 1,
      "x": 4,
      "y": 6,
      "id": 20
    },
    {
      "type": "dock",
      "number": 1,
      "x": 1,
      "y": 6,
      "id": 21
    }
  ]
}
 */
