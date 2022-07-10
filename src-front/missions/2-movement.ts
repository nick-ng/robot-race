import type { GameData } from "dist-common/game-types";
import { getCardMap } from "dist-common/card-map";

const remainingDeck: string[] = [
  "program-card-73",
  "program-card-72",
  "program-card-70",
  "program-card-76",
  "program-card-74",
  "program-card-48",
  "program-card-43",
  "program-card-46",
  "program-card-45",
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
            y: 4,
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
            y: 4,
            id: 0,
          },
          {
            type: "flag",
            number: 1,
            x: 1,
            y: 1,
            id: 1,
          },
        ],
        name: "2: Movement",
        width: 3,
        height: 5,
      },
    },
    lastActionId: "0-0",
    gameServer: null,
    resumeAction: null,
  };

  return {
    gameData,
    missionHeading: "2: More Movement",
    missionObjectives: [
      "Don't fall off the edge!",
      "You need to end a register on the flag to count as touching it.",
    ],
    nextMission: "3-turns",
  };
};

export default getMissionData;

/**
{
  "name": "2: Movement",
  "height": 5,
  "width": 3,
  "items": [
    {
      "type": "dock",
      "number": 1,
      "x": 1,
      "y": 4,
      "id": 0
    },
    {
      "type": "flag",
      "number": 1,
      "x": 1,
      "y": 0,
      "id": 1
    }
  ]
}
 */
