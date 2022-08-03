import type { GameData } from "dist-common/game-types";
import { getCardMap } from "dist-common/card-map";

const remainingDeck: string[] = [
  "program-card-12",
  "program-card-11",
  "program-card-80",
  "program-card-68",
  "program-card-84",
  "program-card-69",
  "program-card-83",
  "program-card-75",
  "program-card-82",
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
      animations: [],
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
            y: 5,
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
        name: "4: Walls",
        height: 7,
        width: 5,
        items: [
          {
            type: "wall",
            x: 3,
            y: 2,
            x1: 4,
            y1: 2,
            id: 0,
          },
          {
            type: "wall",
            x: 2,
            y: 3,
            x1: 3,
            y1: 3,
            id: 1,
          },
          {
            type: "dock",
            number: 1,
            x: 1,
            y: 6,
            id: 2,
          },
          {
            type: "flag",
            number: 1,
            x: 2,
            y: 0,
            id: 3,
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
    missionHeading: "4: Walls",
    missionObjectives: ["Robots can't move through walls."],
    nextMission: "free-practice",
  };
};

export default getMissionData;

/**
{
  "name": "4: Walls",
  "height": 7,
  "width": 5,
  "items": [
    {
      "type": "wall",
      "x": 3,
      "y": 2,
      "x1": 4,
      "y1": 2,
      "id": 0
    },
    {
      "type": "wall",
      "x": 2,
      "y": 3,
      "x1": 3,
      "y1": 3,
      "id": 1
    },
    {
      "type": "dock",
      "number": 1,
      "x": 1,
      "y": 6,
      "id": 2
    },
    {
      "type": "flag",
      "number": 1,
      "x": 2,
      "y": 0,
      "id": 3
    }
  ]
}
 */
