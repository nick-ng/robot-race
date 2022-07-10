import type { GameData } from "dist-common/game-types";
import { getCardMap } from "dist-common/card-map";

const remainingDeck: string[] = [
  "program-card-79",
  "program-card-70",
  "program-card-75",
  "program-card-63",
  "program-card-58",
  "program-card-56",
  "program-card-53",
  "program-card-68",
  "program-card-54",
];

export const getMissionData = (
  playerId: string
): {
  gameData: GameData;
  missionHeading: string;
  missionObjectives: string[];
  nextMission: string;
} => {
  const cardMap = getCardMap();
  const discardedCards: string[] = Object.keys(cardMap).filter(
    (cardId) => !remainingDeck.includes(cardId)
  );

  const gameData: GameData = {
    id: "1",
    shortId: "1",
    host: playerId,
    maxPlayers: 8,
    players: [{ id: playerId, name: "Practice Player" }],
    playerSecrets: {
      [playerId]: {
        password: playerId,
        programRegisters: [null, null, null, null, null],
        cardsInHand: [],
      },
    },
    gameSecrets: {
      password: "server",
      remainingDeck,
      instructionQueue: [],
    },
    gameState: {
      state: "main",
      seatOrder: [playerId],
      finishedProgrammingPlayers: [],
      poweringDownNextTurn: [],
      flagsTouched: { [playerId]: 0 },
      robots: [
        {
          playerId: playerId,
          status: "ok",
          damagePoints: 0,
          lockedRegisters: [],
          lives: 3,
          position: {
            x: 1,
            y: 8,
            facing: "up",
          },
          archiveMarkerId: 0,
          design: "outset",
        },
      ],
      discardedCards,
      cardMap,
    },
    gameSettings: {
      map: {
        items: [
          {
            type: "dock",
            number: 1,
            x: 1,
            y: 8,
            id: 0,
          },
          {
            type: "flag",
            number: 1,
            x: 1,
            y: 2,
            id: 1,
          },
          {
            type: "wall",
            x: 1,
            y: 9,
            x1: 1,
            y1: 8,
            id: 2,
          },
          {
            type: "wall",
            x: 1,
            y: 0,
            x1: 1,
            y1: 1,
            id: 3,
          },
          {
            type: "wall",
            x: 2,
            y: 1,
            x1: 1,
            y1: 1,
            id: 4,
          },
          {
            type: "wall",
            x: 2,
            y: 2,
            x1: 1,
            y1: 2,
            id: 5,
          },
          {
            type: "wall",
            x: 2,
            y: 3,
            x1: 1,
            y1: 3,
            id: 6,
          },
          {
            type: "wall",
            x: 2,
            y: 4,
            x1: 1,
            y1: 4,
            id: 7,
          },
          {
            type: "wall",
            x: 2,
            y: 5,
            x1: 1,
            y1: 5,
            id: 8,
          },
          {
            type: "wall",
            x: 2,
            y: 6,
            x1: 1,
            y1: 6,
            id: 9,
          },
          {
            type: "wall",
            x: 2,
            y: 7,
            x1: 1,
            y1: 7,
            id: 10,
          },
          {
            type: "wall",
            x: 2,
            y: 8,
            x1: 1,
            y1: 8,
            id: 11,
          },
          {
            type: "wall",
            x: 0,
            y: 8,
            x1: 1,
            y1: 8,
            id: 12,
          },
          {
            type: "wall",
            x: 0,
            y: 7,
            x1: 1,
            y1: 7,
            id: 13,
          },
          {
            type: "wall",
            x: 0,
            y: 6,
            x1: 1,
            y1: 6,
            id: 14,
          },
          {
            type: "wall",
            x: 0,
            y: 5,
            x1: 1,
            y1: 5,
            id: 15,
          },
          {
            type: "wall",
            x: 0,
            y: 4,
            x1: 1,
            y1: 4,
            id: 16,
          },
          {
            type: "wall",
            x: 0,
            y: 3,
            x1: 1,
            y1: 3,
            id: 17,
          },
          {
            type: "wall",
            x: 0,
            y: 2,
            x1: 1,
            y1: 2,
            id: 18,
          },
          {
            type: "wall",
            x: 0,
            y: 1,
            x1: 1,
            y1: 1,
            id: 19,
          },
        ],
        name: "1: Movement",
        width: 3,
        height: 10,
      },
    },
    lastActionId: "0-0",
    gameServer: null,
    resumeAction: null,
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
  "name": "1 Movement",
  "height": 10,
  "width": 3,
  "items": [
    {
      "type": "dock",
      "number": 1,
      "x": 1,
      "y": 8,
      "id": 0
    },
    {
      "type": "flag",
      "number": 1,
      "x": 1,
      "y": 2,
      "id": 1
    },
    {
      "type": "wall",
      "x": 1,
      "y": 9,
      "x1": 1,
      "y1": 8,
      "id": 2
    },
    {
      "type": "wall",
      "x": 1,
      "y": 0,
      "x1": 1,
      "y1": 1,
      "id": 3
    },
    {
      "type": "wall",
      "x": 2,
      "y": 1,
      "x1": 1,
      "y1": 1,
      "id": 4
    },
    {
      "type": "wall",
      "x": 2,
      "y": 2,
      "x1": 1,
      "y1": 2,
      "id": 5
    },
    {
      "type": "wall",
      "x": 2,
      "y": 3,
      "x1": 1,
      "y1": 3,
      "id": 6
    },
    {
      "type": "wall",
      "x": 2,
      "y": 4,
      "x1": 1,
      "y1": 4,
      "id": 7
    },
    {
      "type": "wall",
      "x": 2,
      "y": 5,
      "x1": 1,
      "y1": 5,
      "id": 8
    },
    {
      "type": "wall",
      "x": 2,
      "y": 6,
      "x1": 1,
      "y1": 6,
      "id": 9
    },
    {
      "type": "wall",
      "x": 2,
      "y": 7,
      "x1": 1,
      "y1": 7,
      "id": 10
    },
    {
      "type": "wall",
      "x": 2,
      "y": 8,
      "x1": 1,
      "y1": 8,
      "id": 11
    },
    {
      "type": "wall",
      "x": 0,
      "y": 8,
      "x1": 1,
      "y1": 8,
      "id": 12
    },
    {
      "type": "wall",
      "x": 0,
      "y": 7,
      "x1": 1,
      "y1": 7,
      "id": 13
    },
    {
      "type": "wall",
      "x": 0,
      "y": 6,
      "x1": 1,
      "y1": 6,
      "id": 14
    },
    {
      "type": "wall",
      "x": 0,
      "y": 5,
      "x1": 1,
      "y1": 5,
      "id": 15
    },
    {
      "type": "wall",
      "x": 0,
      "y": 4,
      "x1": 1,
      "y1": 4,
      "id": 16
    },
    {
      "type": "wall",
      "x": 0,
      "y": 3,
      "x1": 1,
      "y1": 3,
      "id": 17
    },
    {
      "type": "wall",
      "x": 0,
      "y": 2,
      "x1": 1,
      "y1": 2,
      "id": 18
    },
    {
      "type": "wall",
      "x": 0,
      "y": 1,
      "x1": 1,
      "y1": 1,
      "id": 19
    }
  ]
}
 */
