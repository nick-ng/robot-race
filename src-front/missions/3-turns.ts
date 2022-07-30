import type { GameData } from "dist-common/game-types";
import { getCardMap } from "dist-common/card-map";

const remainingDeck: string[] = [
  "program-card-80",
  "program-card-76",
  "program-card-79",
  "program-card-33",
  "program-card-08",
  "program-card-17",
  "program-card-32",
  "program-card-54",
  "program-card-52",
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
        setRegisterTimestamp: 0,
      },
    },
    gameSecrets: {
      password: "server",
      remainingDeck,
      instructionQueue: [],
    },
    gameState: {
      state: "main",
      turn: 0,
      turnPhase: 0,
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
            y: 1,
            facing: "down",
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
        name: "3: Turn",
        height: 7,
        width: 6,
        items: [
          {
            type: "dock",
            number: 1,
            x: 1,
            y: 1,
            id: 0,
          },
          {
            type: "wall",
            x: 2,
            y: 1,
            x1: 1,
            y1: 1,
            id: 1,
          },
          {
            type: "wall",
            x: 2,
            y: 2,
            x1: 1,
            y1: 2,
            id: 2,
          },
          {
            type: "wall",
            x: 2,
            y: 3,
            x1: 1,
            y1: 3,
            id: 3,
          },
          {
            type: "wall",
            x: 2,
            y: 4,
            x1: 1,
            y1: 4,
            id: 4,
          },
          {
            type: "pit",
            x: 2,
            y: 5,
            id: 5,
          },
          {
            type: "flag",
            number: 1,
            x: 4,
            y: 6,
            id: 6,
          },
        ],
      },
      timerSeconds: 30,
      timerStart: "never",
    },
    lastActionId: "0-0",
    gameServer: null,
    resumeAction: null,
  };

  return {
    gameData,
    missionHeading: "3: Turns",
    missionObjectives: [
      "All programs are performed from the perspective of the robot.",
      "Make sure you turn the correct way to get to the flag.",
    ],
    nextMission: "4-walls",
  };
};

export default getMissionData;

/**
{
  "name": "3: Turn",
  "height": 7,
  "width": 6,
  "items": [
    {
      "type": "dock",
      "number": 1,
      "x": 1,
      "y": 1,
      "id": 0
    },
    {
      "type": "wall",
      "x": 2,
      "y": 1,
      "x1": 1,
      "y1": 1,
      "id": 1
    },
    {
      "type": "wall",
      "x": 2,
      "y": 2,
      "x1": 1,
      "y1": 2,
      "id": 2
    },
    {
      "type": "wall",
      "x": 2,
      "y": 3,
      "x1": 1,
      "y1": 3,
      "id": 3
    },
    {
      "type": "wall",
      "x": 2,
      "y": 4,
      "x1": 1,
      "y1": 4,
      "id": 4
    },
    {
      "type": "pit",
      "x": 2,
      "y": 5,
      "id": 5
    },
    {
      "type": "flag",
      "number": 1,
      "x": 4,
      "y": 6,
      "id": 6
    }
  ]
}
 */
