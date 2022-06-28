import { GameData, Map } from "../../dist-common/game-types";
import { getCardMap } from "../../dist-common/card-map";

export const PLAYER_UUID = "player-1's-uuid";

const getMap = (_?: any): Map => {
  return {
    name: "Exchange",
    items: [
      {
        type: "flag",
        number: 1,
        x: 7,
        y: 1,
      },
      {
        type: "flag",
        number: 2,
        x: 9,
        y: 7,
      },
      {
        type: "flag",
        number: 3,
        x: 1,
        y: 4,
      },
      {
        type: "wall",
        x: 6,
        y: 1,
        x1: 7,
        y1: 1,
      },
      {
        type: "wall",
        x: 4,
        y: 8,
        x1: 4,
        y1: 9,
      },
    ],
    width: 12,
    height: 12 + 4,
    startingPositions: [
      { x: 5, y: 15 },
      { x: 6, y: 15 },
      { x: 3, y: 14 },
      { x: 8, y: 14 },
      { x: 1, y: 13 },
      { x: 10, y: 13 },
      { x: 0, y: 12 },
      { x: 11, y: 12 },
    ],
  };
};

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
      archiveMarkers: {},
      robots: [
        {
          playerId: PLAYER_UUID,
          damagePoints: 0,
          lockedRegisters: [],
          lives: 3,
          position: {
            x: 4,
            y: 3,
            facing: "down",
          },
          design: "outset",
        },
        {
          playerId: "Test-1",
          damagePoints: 0,
          lockedRegisters: [],
          lives: 3,
          position: {
            x: 4,
            y: 8,
            facing: "up",
          },
          design: "ridge",
        },
        {
          playerId: "Test-2",
          damagePoints: 0,
          lockedRegisters: [],
          lives: 3,
          position: {
            x: 4,
            y: 6,
            facing: "left",
          },
          design: "double",
        },
        {
          playerId: "Test-3",
          damagePoints: 0,
          lockedRegisters: [],
          lives: 3,
          position: {
            x: 4,
            y: 5,
            facing: "right",
          },
          design: "dashed",
        },
      ],
      discardedCards: Object.keys(cardMap),
      cardMap,
    },
    gameSettings: {
      map: getMap(),
    },
    lastActionId: "0-0",
    gameServer: null,
    resumeAction: null,
  };

  return defaultGameData;
};
