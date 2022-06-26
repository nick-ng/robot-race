import { GameData, MapItem } from "../../dist-common/game-types";
import { getCardMap } from "../../dist-common/card-map";

export const PLAYER_UUID = "player-1's-uuid";

const getMap = (_?: any): MapItem[][][] => {
  const map: MapItem[][][] = [];

  for (let n = 0; n < 12 + 4; n++) {
    map.push([]);
    for (let m = 0; m < 12; m++) {
      map[n].push([]);
    }
  }

  map[2][2].push({
    type: "flag",
    number: 1,
  });

  map[7][10].push({
    type: "flag",
    number: 2,
  });

  map[8][1].push({
    type: "flag",
    number: 3,
  });

  return map;
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
            x: 0,
            y: 0,
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
            x: 6,
            y: 6,
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
            x: 7,
            y: 7,
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
            x: 3,
            y: 3,
            facing: "right",
          },
          design: "dashed",
        },
      ],
      discardedCards: Object.keys(cardMap),
      cardMap,
    },
    gameSettings: {
      mapName: "a",
      map: getMap(),
      mapStartingPositions: [],
      mapNumberOfFlags: 999,
    },
    lastActionId: "0-0",
    gameServer: null,
  };

  return defaultGameData;
};
