import { GameData } from "../../dist-common/game-types";

export const PLAYER_UUID = "player-1's-uuid";

export const defaultGameData: GameData = {
  id: "1",
  shortId: "1",
  host: PLAYER_UUID,
  maxPlayers: 8,
  players: [{ id: PLAYER_UUID, name: "You" }],
  gameSettings: {
    cardsPerPlayer: 4,
    map: "a",
  },
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
    robotsDamage: {
      [PLAYER_UUID]: { damagePoints: 0, lockedRegisters: [] },
    },
    robotLives: { PLAYER_UUID: 3 },
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
};
