import { GameData, Map } from "../../dist-common/game-types";
import { getCardMap } from "../../dist-common/card-map";
import { getMap } from "../../dist-common/maps";

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
      map: getMap("exchange"),
    },
    lastActionId: "0-0",
    gameServer: null,
    resumeAction: null,
  };

  return defaultGameData;
};
