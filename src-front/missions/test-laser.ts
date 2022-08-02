import type { GameData } from "dist-common/game-types";
import { getCardMap } from "dist-common/card-map";

const remainingDeck: string[] = [
  "program-card-63",
  "program-card-62",
  "program-card-51",
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
            y: 4,
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
      timerStart: "never",
      timerSeconds: 30,
      map: {
        name: "Laser Test",
        height: 8,
        width: 6,
        items: [
          {
            type: "laser",
            direction: "right",
            count: 1,
            x: 1,
            y: 4,
            id: 0,
          },
          {
            type: "laser",
            direction: "right",
            count: 1,
            x: 1,
            y: 2,
            id: 1,
          },
          {
            type: "wall",
            x: 5,
            y: 2,
            x1: 4,
            y1: 2,
            id: 2,
          },
          {
            type: "wall",
            x: 4,
            y: 4,
            x1: 3,
            y1: 4,
            id: 3,
          },
          {
            type: "wall",
            x: 1,
            y: 4,
            x1: 0,
            y1: 4,
            id: 4,
          },
          {
            type: "wall",
            x: 1,
            y: 2,
            x1: 0,
            y1: 2,
            id: 5,
          },
          {
            type: "wall",
            x: 4,
            y: 0,
            x1: 4,
            y1: -1,
            id: 6,
          },
          {
            type: "wall",
            x: 4,
            y: 7,
            x1: 4,
            y1: 6,
            id: 7,
          },
          {
            type: "laser",
            direction: "up",
            count: 2,
            x: 4,
            y: 6,
            id: 8,
          },
          {
            type: "dock",
            number: 1,
            x: 2,
            y: 6,
            id: 9,
          },
          {
            type: "flag",
            number: 1,
            x: 2,
            y: 0,
            id: 10,
          },
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
