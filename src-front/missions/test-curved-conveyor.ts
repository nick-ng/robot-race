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
  height: 7,
  width: 5,
  items: [
    {
      type: "curved-conveyor",
      direction: "up",
      fromDirection: ["right"],
      showStraignt: false,
      speed: 1,
      x: 1,
      y: 3,
      id: 0,
    },
    {
      type: "curved-conveyor",
      direction: "right",
      fromDirection: ["down"],
      showStraignt: false,
      speed: 1,
      x: 1,
      y: 1,
      id: 1,
    },
    {
      type: "curved-conveyor",
      direction: "down",
      fromDirection: ["left"],
      showStraignt: false,
      speed: 1,

      x: 3,
      y: 1,
      id: 2,
    },
    {
      type: "curved-conveyor",
      direction: "left",
      fromDirection: ["up"],
      showStraignt: false,
      speed: 1,
      x: 3,
      y: 3,
      id: 3,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 1,
      x: 1,
      y: 2,
      id: 4,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 2,
      y: 3,
      id: 5,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 1,
      x: 3,
      y: 2,
      id: 6,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 1,
      x: 2,
      y: 1,
      id: 7,
    },
    {
      type: "flag",
      number: 1,
      x: 2,
      y: 2,
      id: 8,
    },
    {
      type: "dock",
      number: 1,
      x: 1,
      y: 5,
      id: 9,
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
            y: 5,
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
  "height": 7,
  "width": 5,
  "items": [
    {
      "type": "curved-conveyor",
      "direction": "up",
      "fromDirection": [
        "right"
      ],
      "showStraignt": false,
      "speed": 1,
      "tempFromDirection": "right",
      "x": 1,
      "y": 3,
      "id": 0
    },
    {
      "type": "curved-conveyor",
      "direction": "right",
      "fromDirection": [
        "down"
      ],
      "showStraignt": false,
      "speed": 1,
      "tempFromDirection": "down",
      "x": 1,
      "y": 1,
      "id": 1
    },
    {
      "type": "curved-conveyor",
      "direction": "down",
      "fromDirection": [
        "left"
      ],
      "showStraignt": false,
      "speed": 1,
      "tempFromDirection": "left",
      "x": 3,
      "y": 1,
      "id": 2
    },
    {
      "type": "curved-conveyor",
      "direction": "left",
      "fromDirection": [
        "up"
      ],
      "showStraignt": false,
      "speed": 1,
      "tempFromDirection": "up",
      "x": 3,
      "y": 3,
      "id": 3
    },
    {
      "type": "straight-conveyor",
      "direction": "up",
      "speed": 1,
      "x": 1,
      "y": 2,
      "id": 4
    },
    {
      "type": "straight-conveyor",
      "direction": "left",
      "speed": 1,
      "x": 2,
      "y": 3,
      "id": 5
    },
    {
      "type": "straight-conveyor",
      "direction": "down",
      "speed": 1,
      "x": 3,
      "y": 2,
      "id": 6
    },
    {
      "type": "straight-conveyor",
      "direction": "right",
      "speed": 1,
      "x": 2,
      "y": 1,
      "id": 7
    },
    {
      "type": "flag",
      "number": 1,
      "x": 2,
      "y": 2,
      "id": 8
    },
    {
      "type": "dock",
      "number": 1,
      "x": 1,
      "y": 5,
      "id": 9
    }
  ]
}
 */
