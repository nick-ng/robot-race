import type { GameData } from "dist-common/game-types";
import { getCardMap } from "dist-common/card-map";

const remainingDeck: string[] = [];

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
          damagePoints: 1,
          lockedRegisters: [],
          lives: 3,
          position: {
            x: 2,
            y: 2,
            facing: "up",
          },
          archiveMarkerId: 2,
          design: "outset",
        },
      ],
      discardedCards,
      cardMap,
    },
    gameSettings: {
      map: {
        name: "Test Power Down",
        height: 5,
        width: 5,
        items: [
          { type: "wall", x: 0, y: 0, x1: 0, y1: -1, id: 0 },
          { type: "wall", x: 1, y: 0, x1: 1, y1: -1, id: 1 },
          { type: "wall", x: 2, y: 0, x1: 2, y1: -1, id: 2 },
          { type: "wall", x: 3, y: 0, x1: 3, y1: -1, id: 3 },
          { type: "wall", x: 4, y: 0, x1: 4, y1: -1, id: 4 },
          { type: "wall", x: 0, y: 4, x1: 0, y1: 5, id: 5 },
          { type: "wall", x: 1, y: 4, x1: 1, y1: 5, id: 6 },
          { type: "wall", x: 2, y: 4, x1: 2, y1: 5, id: 7 },
          { type: "wall", x: 3, y: 4, x1: 3, y1: 5, id: 8 },
          { type: "wall", x: 4, y: 4, x1: 4, y1: 5, id: 9 },
          { type: "wall", x: 0, y: 0, x1: -1, y1: 0, id: 10 },
          { type: "wall", x: 0, y: 1, x1: -1, y1: 1, id: 11 },
          { type: "wall", x: 0, y: 2, x1: -1, y1: 2, id: 12 },
          { type: "wall", x: 0, y: 3, x1: -1, y1: 3, id: 13 },
          { type: "wall", x: 0, y: 4, x1: -1, y1: 4, id: 14 },
          { type: "wall", x: 4, y: 0, x1: 5, y1: 0, id: 15 },
          { type: "wall", x: 4, y: 1, x1: 5, y1: 1, id: 16 },
          { type: "wall", x: 4, y: 2, x1: 5, y1: 2, id: 17 },
          { type: "wall", x: 4, y: 3, x1: 5, y1: 3, id: 18 },
          { type: "wall", x: 4, y: 4, x1: 5, y1: 4, id: 19 },
          { type: "dock", number: 1, x: 2, y: 2, id: 20 },
          { type: "flag", number: 1, x: 0, y: 0, id: 21 },
        ],
      },
    },
    lastActionId: "0-0",
    gameServer: null,
    resumeAction: null,
  };

  return {
    gameData,
    missionHeading: "4: Walls",
    missionObjectives: ["Robots can't move through walls."],
    nextMission: "free-practice",
  };
};

export default getMissionData;

/**
{
  "name": "Test Power Down",
  "height": 5,
  "width": 5,
  "items": [
    {
      "type": "wall",
      "x": 0,
      "y": 0,
      "x1": 0,
      "y1": -1,
      "id": 0
    },
    {
      "type": "wall",
      "x": 1,
      "y": 0,
      "x1": 1,
      "y1": -1,
      "id": 1
    },
    {
      "type": "wall",
      "x": 2,
      "y": 0,
      "x1": 2,
      "y1": -1,
      "id": 2
    },
    {
      "type": "wall",
      "x": 3,
      "y": 0,
      "x1": 3,
      "y1": -1,
      "id": 3
    },
    {
      "type": "wall",
      "x": 4,
      "y": 0,
      "x1": 4,
      "y1": -1,
      "id": 4
    },
    {
      "type": "wall",
      "x": 0,
      "y": 4,
      "x1": 0,
      "y1": 5,
      "id": 5
    },
    {
      "type": "wall",
      "x": 1,
      "y": 4,
      "x1": 1,
      "y1": 5,
      "id": 6
    },
    {
      "type": "wall",
      "x": 2,
      "y": 4,
      "x1": 2,
      "y1": 5,
      "id": 7
    },
    {
      "type": "wall",
      "x": 3,
      "y": 4,
      "x1": 3,
      "y1": 5,
      "id": 8
    },
    {
      "type": "wall",
      "x": 4,
      "y": 4,
      "x1": 4,
      "y1": 5,
      "id": 9
    },
    {
      "type": "wall",
      "x": 0,
      "y": 0,
      "x1": -1,
      "y1": 0,
      "id": 10
    },
    {
      "type": "wall",
      "x": 0,
      "y": 1,
      "x1": -1,
      "y1": 1,
      "id": 11
    },
    {
      "type": "wall",
      "x": 0,
      "y": 2,
      "x1": -1,
      "y1": 2,
      "id": 12
    },
    {
      "type": "wall",
      "x": 0,
      "y": 3,
      "x1": -1,
      "y1": 3,
      "id": 13
    },
    {
      "type": "wall",
      "x": 0,
      "y": 4,
      "x1": -1,
      "y1": 4,
      "id": 14
    },
    {
      "type": "wall",
      "x": 4,
      "y": 0,
      "x1": 5,
      "y1": 0,
      "id": 15
    },
    {
      "type": "wall",
      "x": 4,
      "y": 1,
      "x1": 5,
      "y1": 1,
      "id": 16
    },
    {
      "type": "wall",
      "x": 4,
      "y": 2,
      "x1": 5,
      "y1": 2,
      "id": 17
    },
    {
      "type": "wall",
      "x": 4,
      "y": 3,
      "x1": 5,
      "y1": 3,
      "id": 18
    },
    {
      "type": "wall",
      "x": 4,
      "y": 4,
      "x1": 5,
      "y1": 4,
      "id": 19
    },
    {
      "type": "dock",
      "number": 1,
      "x": 2,
      "y": 2,
      "id": 20
    },
    {
      "type": "flag",
      "number": 1,
      "x": 0,
      "y": 0,
      "id": 21
    }
  ]
}
 */
