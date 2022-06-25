import { GameData, MapItem } from "../../dist-common/game-types";

export const PLAYER_UUID = "player-1's-uuid";

const getMap = (): MapItem[][][] => {
  const map: MapItem[][][] = [];

  for (let n = 0; n < 12 + 4; n++) {
    map.push([]);
    for (let m = 0; m < 12; m++) {
      map[n].push([]);
    }
  }

  return map;
};

export const defaultGameData: GameData = {
  id: "1",
  shortId: "1",
  host: PLAYER_UUID,
  maxPlayers: 8,
  players: [{ id: PLAYER_UUID, name: "Practice Player" }],
  playerSecrets: {
    [PLAYER_UUID]: {
      password: PLAYER_UUID,
      programRegisters: [null, null, null, null, null],
      cardsInHand: [
        "card-uuid-01",
        "card-uuid-02",
        "card-uuid-03",
        "card-uuid-04",
        "card-uuid-05",
        "card-uuid-06",
        "card-uuid-07",
      ],
    },
  },
  gameSecrets: {
    password: "server",
    remainingDeck: [
      "card-uuid-01",
      "card-uuid-02",
      "card-uuid-03",
      "card-uuid-04",
      "card-uuid-05",
      "card-uuid-06",
      "card-uuid-07",
    ],
  },
  gameState: {
    state: "main",
    seatOrder: [PLAYER_UUID],
    finishedProgrammingPlayers: [],
    poweringDownNextTurn: [],
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
        design: "dotted",
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
    instructionQueue: [],
    discardedCards: [],
    cardMap: {
      "card-uuid-01": {
        id: "card-uuid-01",
        action: "Move 1",
        priority: 4,
      },
      "card-uuid-02": {
        id: "card-uuid-02",
        action: "Move 2",
        priority: 5,
      },
      "card-uuid-03": {
        id: "card-uuid-03",
        action: "Move 3",
        priority: 6,
      },
      "card-uuid-04": {
        id: "card-uuid-04",
        action: "Back Up",
        priority: 3,
      },
      "card-uuid-05": {
        id: "card-uuid-05",
        action: "Rotate Right",
        priority: 2,
      },
      "card-uuid-06": {
        id: "card-uuid-06",
        action: "Rotate Left",
        priority: 1,
      },
      "card-uuid-07": {
        id: "card-uuid-07",
        action: "U-Turn",
        priority: 0,
      },
    },
  },
  gameSettings: {
    mapName: "a",
    map: getMap(),
  },
};
