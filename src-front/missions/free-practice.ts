import type { GameData } from "dist-common/game-types";
import { getCardMap } from "dist-common/card-map";
import { getMap } from "dist-common/maps";

export const getMissionData = (
  playerId: string
): {
  gameData: GameData;
  missionHeading: string;
  missionObjectives: string[];
} => {
  const cardMap = getCardMap();

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
      remainingDeck: [],
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
          playerId,
          status: "ok",
          damagePoints: 0,
          lockedRegisters: [],
          lives: 3,
          position: {
            x: 5,
            y: 15,
            facing: "up",
          },
          archiveMarkerId: 8,
          design: "outset",
        },
        {
          playerId: "Test-1",
          status: "ok",
          damagePoints: 0,
          lockedRegisters: [],
          lives: 3,
          position: {
            x: 7,
            y: 9,
            facing: "right",
          },
          archiveMarkerId: 1,
          design: "ridge",
        },
        {
          playerId: "Test-2",
          status: "ok",
          damagePoints: 0,
          lockedRegisters: [],
          lives: 3,
          position: {
            x: 5,
            y: 4,
            facing: "up",
          },
          archiveMarkerId: 2,
          design: "double",
        },
        {
          playerId: "Test-3",
          status: "ok",
          damagePoints: 0,
          lockedRegisters: [],
          lives: 3,
          position: {
            x: 7,
            y: 13,
            facing: "up",
          },
          archiveMarkerId: 3,
          design: "dashed",
        },
        {
          playerId: "Test-4",
          status: "ok",
          damagePoints: 0,
          lockedRegisters: [],
          lives: 3,
          position: {
            x: 7,
            y: 1,
            facing: "up",
          },
          archiveMarkerId: 8,
          design: "dotted",
        },
        {
          playerId: "Test-5",
          status: "ok",
          damagePoints: 0,
          lockedRegisters: [],
          lives: 3,
          position: {
            x: 9,
            y: 8,
            facing: "left",
          },
          archiveMarkerId: 8,
          design: "#ffffff",
        },
      ],
      discardedCards: Object.keys(cardMap),
      cardMap,
    },
    gameSettings: {
      map: getMap("risky exchange"),
      timerSeconds: 30,
      timerStart: "never",
    },
    lastActionId: "0-0",
    gameServer: null,
    resumeAction: null,
  };

  return {
    gameData,
    missionHeading: "Free Practice",
    missionObjectives: ["Practice on the map Risky Exchange."],
  };
};

export default getMissionData;
