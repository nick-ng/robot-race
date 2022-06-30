import { GameData, Map } from "dist-common/game-types";
import { getCardMap } from "dist-common/card-map";
import { getMap } from "dist-common/maps";

export const PLAYER_UUID = "player-1's-uuid";

export const getDefaultGameData = (): GameData => {
  const cardMap = getCardMap();

  const defaultGameData: GameData = {
    id: "1",
    shortId: "1",
    host: PLAYER_UUID,
    maxPlayers: 8,
    players: [{ id: PLAYER_UUID, name: "Practice Player" }],
    playerSecrets: {
      [PLAYER_UUID]: {
        password: PLAYER_UUID,
        programRegisters: [null, null, null, null, null],
        cardsInHand: [],
      },
    },
    gameSecrets: {
      password: "server",
      remainingDeck: [],
      instructionQueue: [],
    },
    gameState: {
      state: "main",
      seatOrder: [PLAYER_UUID],
      finishedProgrammingPlayers: [],
      poweringDownNextTurn: [],
      flagsTouched: { [PLAYER_UUID]: 0 },
      robots: [
        {
          playerId: PLAYER_UUID,
          status: "ok",
          damagePoints: 0,
          lockedRegisters: [],
          lives: 3,
          position: {
            x: 5,
            y: 15,
            facing: "up",
          },
          archiveMarkerId: 0,
          design: "outset",
        },
        {
          playerId: "Test-1",
          status: "ok",
          damagePoints: 0,
          lockedRegisters: [],
          lives: 3,
          position: {
            x: 1,
            y: 1,
            facing: "down",
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
            x: 0,
            y: 0,
            facing: "right",
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
            x: 11,
            y: 15,
            facing: "up",
          },
          archiveMarkerId: 3,
          design: "dashed",
        },
      ],
      discardedCards: Object.keys(cardMap),
      cardMap,
    },
    gameSettings: {
      map: getMap("risky exchange"),
    },
    lastActionId: "0-0",
    gameServer: null,
    resumeAction: null,
  };

  return defaultGameData;
};
